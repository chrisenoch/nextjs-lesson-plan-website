import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole, isUserRole } from "./models/types/UserRole";
import {
  ProtectedRouteInfo,
  ProtectedRouteInfoBySecondaryRoute,
  ProtectedRoutes,
  isProtectedRouteChildren,
  ProtectedSecondaryRouteInfo,
  ProtectedRouteInfoNoChildren,
} from "./models/types/ProtectedRoutes";
import { getArrayIntersection } from "./utils/array-functions";
import { joseVerifyToken } from "./server-only/auth/check-permissions";

let count = 0;
export async function middleware(request: NextRequest) {
  console.log("middleware count " + ++count);
  const originalPath = request.nextUrl.pathname; //Do not convert to lowerCase here. If you do if (urlPathNoStartSlash !== originalPathNoStartSlash)
  //will pass and the final url will NOT be converted to lowerCase.
  const removeMultipleSlashes = /\/\/+/g;
  const enteredUrlPathCleaned = removeStartSlashIfPresent(
    request.nextUrl.pathname.replaceAll(removeMultipleSlashes, "/")
  );

  //modify path if navigated from a SecueNextLink component
  const nextLinkRelativeUrl = handleSecureNextLink(request);
  if (nextLinkRelativeUrl) {
    return NextResponse.redirect(new URL(nextLinkRelativeUrl, request.url));
  }

  //convert path to lowerCase if necessary
  if (originalPath !== originalPath.toLowerCase()) {
    return NextResponse.redirect(
      new URL(originalPath.toLowerCase(), request.url)
    );
  }

  //check permissions and redirect if necessary
  const accessTokenRole = await getAccessTokenRole(request);
  const userRoles: UserRole[] = getUserRolesIfExist(accessTokenRole);
  userRoles.push("EVERYBODY"); //Everybody has this role (both logged-in and non-logged-in users)

  console.log("userRoles in middleware");
  console.log(userRoles);

  const urlPath = getUrlPathBasedOnPermissions({
    enteredUrlPath: enteredUrlPathCleaned,
    protectedRoutes,
    userRoles,
    notLoggedInRedirectUrlPath: "/auth/signin",
    incorrectRoleRedirectUrlPath: "/",
    superAdmin: "ADMIN",
  });

  const urlPathNoStartSlash = removeStartSlashIfPresent(urlPath);
  const originalPathNoStartSlash = removeStartSlashIfPresent(originalPath);
  if (urlPathNoStartSlash !== originalPathNoStartSlash) {
    return NextResponse.redirect(new URL(urlPath.toLowerCase(), request.url));
  } else {
    return NextResponse.next();
  }

  //return NextResponse.next();
}

// IMPORTANT: For childen, you MUST define the routes from least specific to most specific because the first
// match wins. For example,
// DO THIS:
// children: [
//   { shop: { roles: ["USER"] } },
//   { "shop/secret": { roles: ["ADMIN"] } },    // "shop/secret" is more specific than "shop" so it is defined after.
//   { "shop/account": { roles: ["USER"] } },
// ],
//DO NOT do this:
// children: [
//   { "shop/secret": { roles: ["ADMIN"] } },    // Danger! User with the role "USER" will be able to navigate here.
//   { shop: { roles: ["USER"] } },              // "shop" matches before "shop/secret"
//   { "shop/account": { roles: ["USER"] } },
// ],
//This function does not protect child routes automatically. E.g. If you assign the admin role to the route 'lessonPlans'
//and do not include any children routes, then 'lessonPlans/1' will not be protected. //To do: Change this
const protectedRoutes: ProtectedRoutes = {
  "my-jobs": {
    roles: ["USER"],
    notLoggedInRedirectUrlPath: "/premium",
  },
  lessonplans: {
    roles: ["EVERYBODY"],
    children: [
      { saved: { roles: ["USER"] } },
      { 1: { roles: ["EVERYBODY"] } },
      { 2: { roles: ["USER"] } },
      { 3: { roles: ["USER"] } },
      { 4: { roles: ["USER"] } },
    ],
  },
  user: {
    roles: ["ADMIN"],
    children: [
      { profile: { roles: ["USER"] } },
      { "profile/secret": { roles: ["ADMIN"] } },
      {
        "profile/account": {
          roles: ["USER"],
          notLoggedInRedirectUrlPath: "/premium?foo=bar",
        },
      },
    ],
  },
  test: {
    roles: ["EVERYBODY"],
    children: [{ foo: { roles: ["EVERYBODY"] } }],
  },
};

//
//Helper functions

// superAdmin parameter is the role that you choose which has superAdmin powers
// (access to everything), if you decide such a role should exist.
// If the user does not have a role, pass an empty array for userRoles.
// enteredUrlPath must be lowercase and have the path segments separated by one slash and not multiple slashes.
// OK: http://localhost:3000/user/profile/
// Not OK: http://localhost:3000/usER//profile/
//To do? Add :ANY PARAM. E.g. users/:ANY/profile  :ANY could be any number
function getUrlPathBasedOnPermissions({
  enteredUrlPath,
  protectedRoutes,
  userRoles,
  notLoggedInRedirectUrlPath,
  incorrectRoleRedirectUrlPath,
  superAdmin,
}: {
  enteredUrlPath: string;
  protectedRoutes: ProtectedRoutes;
  userRoles: UserRole[];
  notLoggedInRedirectUrlPath: string;
  incorrectRoleRedirectUrlPath: string;
  superAdmin?: UserRole;
}) {
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

  // If user doesn't have a role. E.g. he does not the 'EVERYBODY' role, does not have an auth cookie or
  // if his token is invalid.
  // To do?: Change so that developer can add different failureRedirectPaths for different urls in 'protectedRoutes.'
  if (userRoles.length < 1) {
    return notLoggedInRedirectUrlPath;
  }

  const primaryUrlSegment = getPrimaryUrlSegment(enteredUrlPath);

  //roles should always exist here
  const protectedRouteInfo: ProtectedRouteInfo =
    protectedRoutes[primaryUrlSegment];
  if (protectedRouteInfo) {
    if (!isProtectedRouteChildren(protectedRouteInfo)) {
      const rolesUserHasForPrimaryRoute = getArrayIntersection(
        protectedRouteInfo.roles,
        userRoles
      );

      if (protectedRouteInfo.notLoggedInRedirectUrlPath) {
        notLoggedInRedirectUrlPath =
          protectedRouteInfo.notLoggedInRedirectUrlPath;
      }

      return getUrlPathOnceRolesAreKnown({
        requiredRolesUserHas: rolesUserHasForPrimaryRoute,
        successUrlPath: enteredUrlPath,
        incorrectRoleRedirectUrlPath,
        notLoggedInRedirectUrlPath,
        userRoles,
      });
    } else {
      //If entry DOES have children
      let rolesUserHasForChildrenRoute = [];
      const children = protectedRouteInfo.children;
      //Array method toReversed() does not work. Maybe because NextJS middleware uses the Edge environment
      const childrenReversed = [...children].reverse();

      let protectedRouteInfoNoChildrenIfExists: null | ProtectedRouteInfoNoChildren =
        null;
      //Search from most specific to least specific and then return the first match.
      childrenBlock: for (const protectedRouteInfoBySecondaryRoute of childrenReversed) {
        for (const [
          secondaryUrlSegments,
          protectedRouteInfoNoChildren,
        ] of Object.entries(protectedRouteInfoBySecondaryRoute)) {
          console.log("roles for secondary route");
          console.log(protectedRouteInfoNoChildren.roles);

          const protectedUrlPath =
            primaryUrlSegment + "/" + secondaryUrlSegments;

          if (enteredUrlPath.includes(protectedUrlPath)) {
            rolesUserHasForChildrenRoute = getArrayIntersection(
              protectedRouteInfoNoChildren.roles,
              userRoles
            );
            protectedRouteInfoNoChildrenIfExists = protectedRouteInfoNoChildren;
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
            protectedRouteInfo.roles,
            userRoles
          );

          if (protectedRouteInfo.notLoggedInRedirectUrlPath) {
            notLoggedInRedirectUrlPath =
              protectedRouteInfo.notLoggedInRedirectUrlPath;
          }

          return getUrlPathOnceRolesAreKnown({
            requiredRolesUserHas: rolesUserHasForPrimaryRoute,
            successUrlPath: enteredUrlPath,
            incorrectRoleRedirectUrlPath,
            notLoggedInRedirectUrlPath,
            userRoles,
          });
        } else {
          //If get here, user not authorised or not logged-in
          //check if custom url paths were set
          if (
            protectedRouteInfoNoChildrenIfExists &&
            protectedRouteInfoNoChildrenIfExists.notLoggedInRedirectUrlPath
          ) {
            notLoggedInRedirectUrlPath =
              protectedRouteInfoNoChildrenIfExists.notLoggedInRedirectUrlPath;
          }

          if (userRoles.includes("EVERYBODY") && userRoles.length === 1) {
            return notLoggedInRedirectUrlPath;
          }

          return incorrectRoleRedirectUrlPath;
        }
      }
    }
  } else {
    // If get to here, there has been an error. At this point, we know that the route
    // is protected and so protectedPrimaryRoute should have a value.
    return notLoggedInRedirectUrlPath;
  }
}

function getAllProtectedRoutes(protectedRoutes: ProtectedRoutes) {
  const allProtectedRoutes = new Set<string>();
  Object.entries(protectedRoutes).forEach(
    ([primaryRoute, protectedRouteInfo]: [string, ProtectedRouteInfo]) => {
      allProtectedRoutes.add(primaryRoute.toLowerCase());

      if (isProtectedRouteChildren(protectedRouteInfo)) {
        Object.values(protectedRouteInfo.children).forEach(
          (
            protectedRouteInfoBySecondaryRoute: ProtectedRouteInfoBySecondaryRoute
          ) => {
            Object.keys(protectedRouteInfoBySecondaryRoute).forEach(
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

function getUrlPathOnceRolesAreKnown({
  requiredRolesUserHas,
  userRoles,
  successUrlPath,
  incorrectRoleRedirectUrlPath,
  notLoggedInRedirectUrlPath,
}: {
  requiredRolesUserHas: UserRole[];
  userRoles: UserRole[];
  successUrlPath: string;
  incorrectRoleRedirectUrlPath: string;
  notLoggedInRedirectUrlPath: string;
}) {
  if (requiredRolesUserHas.length > 0) {
    //user is authorised
    return successUrlPath;
  } else if (
    //user is not logegd in
    requiredRolesUserHas.length === 0 &&
    userRoles.length === 1 &&
    userRoles.includes("EVERYBODY")
  ) {
    return notLoggedInRedirectUrlPath;
  } else {
    return incorrectRoleRedirectUrlPath;
  }
}

function getUserRolesIfExist(accessTokenRole: string | null) {
  const userRoles: UserRole[] = [];
  if (accessTokenRole) {
    if (isUserRole(accessTokenRole)) {
      userRoles.push(accessTokenRole);
    }
  }
  return userRoles;
}

async function getAccessTokenRole(request: NextRequest) {
  let accessTokenRole = null;
  const accessToken = request.cookies.get(
    process.env.ACCESS_TOKEN_COOKIE_NAME!
  );
  if (accessToken) {
    const accessTokenRolePromise = extractRoleFromAccessToken(
      accessToken.value,
      process.env.ACCESS_TOKEN_SECRET!
    );
    accessTokenRole = await accessTokenRolePromise;
  }
  return accessTokenRole;
}

//returns the role, or null if no role exists
async function extractRoleFromAccessToken(
  accessToken: string | undefined,
  secret: string
): Promise<string | null> {
  if (!accessToken) {
    return null;
  }
  if (accessToken) {
    try {
      const { payload: accessTokenPayload } = await joseVerifyToken(
        accessToken,
        secret
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

function handleSecureNextLink(request: NextRequest) {
  const originalPath = request.nextUrl.pathname.toLowerCase();
  const {
    nextUrl: { search },
  } = request;
  const params = new URLSearchParams(search);
  let isNextLink;
  if (params.get("next-link")) {
    isNextLink = true;
    params.delete("next-link");
  }

  if (isNextLink && params.size === 0) {
    return originalPath;
  } else if (isNextLink && params.size > 0) {
    return originalPath + "?" + params.toString();
  } else {
    return null;
  }
}
