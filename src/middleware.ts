import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole, isSpecifiedUserRole } from "./models/types/UserRole";
import * as jose from "jose";
import {
  ProtectedRoute,
  ProtectedRouteRoles,
  ProtectedRouteRolesByRoute,
  ProtectedRoutes,
  isProtectedRouteChildren,
} from "./models/types/ProtectedRoutes";
import { getArrayIntersection } from "./utils/array-functions";

let count = 0;
export async function middleware(request: NextRequest) {
  console.log("middleware count " + ++count);
  const originalPath = request.nextUrl.pathname;

  //Modify path of SecueNextLink
  if (originalPath.includes("/next-link-wrapper-id")) {
    const index = originalPath.indexOf("/next-link-wrapper-id");
    const newRelativeUrl = originalPath.substring(0, index);
    return NextResponse.redirect(new URL(newRelativeUrl, request.url));
  }

  const accessTokenRole = await getAccessTokenRole(request);
  const userRoles: UserRole[] = getUserRolesIfExist(accessTokenRole);

  const urlPath = getUrlPathBasedOnPermissions({
    request,
    protectedRoutes,
    userRoles,
    notLoggedInRedirectUrlPath: "/auth/signin",
    incorrrectRoleRedirectUrlPath: "/",
    superAdmin: "ADMIN",
  });

  const urlPathNoStartSlash = removeStartSlashIfPresent(urlPath);
  const originalPathNoStartSlash = removeStartSlashIfPresent(originalPath);
  if (urlPathNoStartSlash !== originalPathNoStartSlash) {
    return NextResponse.redirect(new URL(urlPath, request.url));
  } else {
    return NextResponse.next();
  }
}

function getUserRolesIfExist(accessTokenRole: string | null) {
  const userRoles: UserRole[] = [];
  if (accessTokenRole) {
    if (isSpecifiedUserRole(accessTokenRole, ["ADMIN", "USER"])) {
      userRoles.push(accessTokenRole);
    }
  }
  return userRoles;
}

async function getAccessTokenRole(request: NextRequest) {
  let accessTokenRole = null;
  const accessToken = request.cookies.get("jwt");
  if (accessToken) {
    const accessTokenRolePromise = extractRoleFromAccessToken(
      accessToken.value,
      "my-secret"
    );
    accessTokenRole = await accessTokenRolePromise;
  }
  return accessTokenRole;
}

//
//Helper functions

//returns the role, or null if no role exists
async function extractRoleFromAccessToken(
  accessToken: string | undefined,
  secret: string
): Promise<string | null> {
  console.log("accessToken in getRoleFromAccessToken: " + accessToken);
  console.log(accessToken);
  if (!accessToken) {
    return null;
  }
  if (accessToken) {
    try {
      console.log("in try checkPermissions");
      const { payload: accessTokenPayload } = await jose.jwtVerify(
        accessToken,
        new TextEncoder().encode(secret)
      );
      //Token has been verified
      const userRole = accessTokenPayload.role;
      //check is of UserRole type
      if (typeof userRole === "string") {
        return userRole;
      } else {
        return null;
      }
    } catch {
      console.log(
        "in catch in check-permissions: access token verification failed"
      );
      return null;
    }
  } else {
    return null;
  }
}

//Will match the most specific routes first. E.g. accounts/statistics/... will be matched before account
const protectedRoutes: ProtectedRoutes = {
  jobs: { roles: ["USER"] },
  lessonplans: { roles: ["USER"] },
  //premium: { roles: ["ADMIN"] },
  user: {
    roles: ["ADMIN"],
    children: [
      { profile: { roles: ["USER"] } },
      { "profile/account": { roles: ["ADMIN"] } },
      { "profile/secret": { roles: ["USER"] } },
    ],
  },
};

function getAllProtectedRoutes(protectedRoutes: ProtectedRoutes) {
  const allProtectedRoutes = new Set<string>();
  Object.entries(protectedRoutes).forEach(
    ([primaryRoute, protectedRoute]: [string, ProtectedRoute]) => {
      allProtectedRoutes.add(primaryRoute.toLowerCase());

      if (isProtectedRouteChildren(protectedRoute)) {
        Object.values(protectedRoute.children).forEach(
          (protectedRouteRolesByRoute: ProtectedRouteRolesByRoute) => {
            Object.keys(protectedRouteRolesByRoute).forEach(
              (secondaryRoute: string) => {
                allProtectedRoutes.add(
                  primaryRoute.toLowerCase() +
                    "/" +
                    secondaryRoute.toLowerCase()
                );
              }
            );
          }
        );
      }
    }
  );
  return allProtectedRoutes;
}

// superAdmin parameter is the role that you choose which has superAdmin powers
// (access to everything), if you decide such a role should exist.
//If the user does not have a role, pass an empty array for userRoles.
function getUrlPathBasedOnPermissions({
  request,
  protectedRoutes,
  userRoles,
  notLoggedInRedirectUrlPath,
  incorrrectRoleRedirectUrlPath,
  superAdmin,
}: {
  request: NextRequest;
  protectedRoutes: ProtectedRoutes;
  userRoles: UserRole[];
  notLoggedInRedirectUrlPath: string;
  incorrrectRoleRedirectUrlPath: string;
  superAdmin?: UserRole;
}) {
  const enteredUrlPath = removeStartSlashIfPresent(
    request.nextUrl.pathname
  ).toLowerCase();

  const allProtectedRoutes: Set<string> =
    getAllProtectedRoutes(protectedRoutes);

  //superAdmin has access to all routes if superAdmin exists
  //To do?: Change superAdmin to an array so that developer can assign multiple superAdmins
  if (superAdmin && userRoles.includes(superAdmin)) {
    return enteredUrlPath;
  }

  //If route not protected, return unchanged url so user can go where he wants.
  if (!allProtectedRoutes.has(enteredUrlPath)) {
    return enteredUrlPath;
  }
  //If get to here, route is protected.

  // If user doesn't have a role. E.g. he does not have an auth cookie or if his token is invalid.
  // To do?: Change so that developer can add different failureRedirectPaths for different urls in 'protectedRoutes.'
  if (userRoles.length < 1) {
    return notLoggedInRedirectUrlPath;
  }

  const primaryUrlSegment = getPrimaryUrlSegment(enteredUrlPath);

  //roles should always exist here
  const protectedPrimaryRoute: ProtectedRoute =
    protectedRoutes[primaryUrlSegment];
  if (protectedPrimaryRoute) {
    if (!isProtectedRouteChildren(protectedPrimaryRoute)) {
      const rolesUserHasForPrimaryRoute = getArrayIntersection(
        protectedPrimaryRoute.roles,
        userRoles
      );

      return getUrlPathOnceRolesAreKnown({
        rolesUserHas: rolesUserHasForPrimaryRoute,
        successUrlPath: enteredUrlPath,
        incorrrectRoleRedirectUrlPath,
      });
    } else {
      //If entry DOES have children
      let rolesUserHasForChildrenRoute = [];
      const children = protectedPrimaryRoute.children;
      //Array method toReversed() does not work. Maybe because NextJS middleware uses the Edge environment
      const childrenReversed = [...children].reverse();

      //Search from most specific to least specific and then return the first match.
      childrenBlock: for (const protectedRouteRolesByRoute of childrenReversed) {
        for (const [
          secondaryUrlSegments,
          rolesForSecondaryRoute,
        ] of Object.entries(protectedRouteRolesByRoute)) {
          const protectedUrlPath =
            primaryUrlSegment + "/" + secondaryUrlSegments;

          if (enteredUrlPath.includes(protectedUrlPath)) {
            rolesUserHasForChildrenRoute = getArrayIntersection(
              rolesForSecondaryRoute.roles,
              userRoles
            );
            break childrenBlock;
          }
        }
      }

      //check if user role is one of the required roles
      if (rolesUserHasForChildrenRoute.length > 0) {
        //user is authorised
        return enteredUrlPath;
      } else {
        //Check to see if the user navigated to the primary route segment
        if (primaryUrlSegment.includes(enteredUrlPath)) {
          const rolesUserHasForPrimaryRoute = getArrayIntersection(
            protectedPrimaryRoute.roles,
            userRoles
          );

          return getUrlPathOnceRolesAreKnown({
            rolesUserHas: rolesUserHasForPrimaryRoute,
            successUrlPath: enteredUrlPath,
            incorrrectRoleRedirectUrlPath,
          });
        } else {
          return incorrrectRoleRedirectUrlPath;
        }
      }
    }
  } else {
    // If get to here, there has been an error. At this point, we know that the route
    // is protected and so protectedPrimaryRoute should have a value.

    return notLoggedInRedirectUrlPath;
  }
}

function getUrlPathOnceRolesAreKnown({
  rolesUserHas,
  successUrlPath,
  incorrrectRoleRedirectUrlPath,
}: {
  rolesUserHas: UserRole[];
  successUrlPath: string;
  incorrrectRoleRedirectUrlPath: string;
}) {
  if (rolesUserHas.length > 0) {
    //user is authorised
    return successUrlPath;
  } else {
    return incorrrectRoleRedirectUrlPath;
  }
}

function removeStartSlashIfPresent(urlPath: string) {
  if (urlPath.startsWith("/")) {
    return urlPath.substring(1);
  } else {
    return urlPath;
  }
}

function getPrimaryUrlSegment(urlPath: string) {
  let urlPathNoStartSlash;
  let primaryUrlSegment;
  if (urlPath.startsWith("/")) {
    urlPathNoStartSlash = urlPath.substring(1);
  } else {
    urlPathNoStartSlash = urlPath;
  }

  if (urlPathNoStartSlash.indexOf("/") !== -1) {
    primaryUrlSegment = urlPathNoStartSlash.substring(
      0,
      urlPathNoStartSlash.indexOf("/")
    );
    return primaryUrlSegment;
  } else {
    primaryUrlSegment = urlPathNoStartSlash;
    return primaryUrlSegment;
  }
}

//To do?
//Add :ANY PARAM
//E.g. users/:ANY/profile  :ANY could be any number
