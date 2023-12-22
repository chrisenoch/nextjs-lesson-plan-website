import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "./models/types/UserRole";
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
  } else {
    // //To do - delete userRoles array - just for testing
    const userRoles: UserRole[] = ["USER"];

    const urlPath = getUrlPathBasedOnPermissions({
      request,
      protectedRoutes,
      userRoles,
      notLoggedInRedirectUrlPath: "/auth/signin",
      incorrrectRoleRedirectUrlPath: "/",
      superAdmin: "ADMIN",
    });

    if (urlPath) {
      const urlPathNoStartSlash = removeStartSlashIfPresent(urlPath);
      const originalPathNoStartSlash = removeStartSlashIfPresent(originalPath);

      if (urlPathNoStartSlash !== originalPathNoStartSlash) {
        return NextResponse.redirect(new URL(urlPath, request.url));
        //return NextResponse.next();
      } else {
        return NextResponse.next();
      }
    }
  }
}

// let isUser = false;
// let isAdmin = false;
// let accessToken;

// //Get the authentication roles
// const authCookie = request.cookies.get("jwt");
// if (authCookie) {
//   accessToken = authCookie.value;
//   const isAdminPromise = checkPermissions("ADMIN", accessToken);
//   isAdmin = await isAdminPromise;
//   const isUserPromise = checkPermissions("USER", accessToken);
//   isUser = await isUserPromise;
// }

// console.log("isAdmin " + isAdmin);
// console.log("isUser " + isUser);

// console.log("before handleAuthWithNextWrapperI 1, count " + count);
// handleAuthWithNextWrapperId(
//   request,
//   isAdmin,
//   protectedRoutesAdmin,
//   "/auth/signin"
// );
// console.log("before handleAuthWithNextWrapperI 2, count " + count);
// handleAuthWithNextWrapperId(
//   request,
//   isUser,
//   protectedRoutesUser,
//   "/auth/signin"
// );

// console.log("before handleAuth 1, count " + count);
// handleAuth(request, isAdmin, protectedRoutesAdmin, "/auth/signin");

// console.log("before handleAuth 2, count " + count);
// handleAuth(request, isUser, protectedRoutesUser, "/auth/signin");

// if (originalPath.includes("/next-link-wrapper-id")) {
//   const newRelativeUrl = removeSecureNextLinkSuffix(originalPath);

//   if (protectedRoutes.includes(newRelativeUrl)) {
//     if (isAdmin) {
//       return NextResponse.redirect(new URL(newRelativeUrl, request.url));
//     } else {
//       return NextResponse.redirect(new URL("/auth/signin", request.url));
//     }
//   }
//   //not a protected route, but route includes a next-link-wrapper-id
//   return NextResponse.redirect(new URL(newRelativeUrl, request.url));
// }

// //route was not reached via a SecureNextLink link component. E.g. The user loaded the page directly or was redirected from a route.tsx
// if (
//   protectedRoutes.includes(originalPath) &&
//   !originalPath.includes("/next-link-wrapper-id")
// ) {
//   if (isAdmin) {
//     return NextResponse.next();
//   } else {
//     return NextResponse.redirect(new URL("/auth/signin", request.url));
//   }
// }

//not a protected route and does not include a next-link-wrapper-id
//return NextResponse.next();

//
//Helper functions

async function checkPermissions(
  role: UserRole,
  accessToken: string | undefined
) {
  console.log("accessToken in c-p");
  console.log(accessToken);
  if (!accessToken) {
    return false;
  }
  if (accessToken) {
    try {
      console.log("in try checkPermissions");
      const { payload: accessTokenPayload } = await jose.jwtVerify(
        accessToken,
        new TextEncoder().encode("my-secret")
      );
      const userRole = accessTokenPayload.role;

      if (userRole === role) {
        console.log("successful role check");
        return true;
      } else {
        console.log("failed role check");
        return false;
      }
    } catch {
      console.log(
        "in catch in check-permissions: access token verification failed"
      );
      return false;
    }
  } else {
    return false;
  }
}

// //Will match the most specific routes first. E.g. accounts/statistics/... will be matched before account
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

// superAdmin field is not if the user is superAdmin. It is the role that you choose
// which has superAdmin powers (access to everything), if you decide such a role
// should exist.

//If the user does not have a role, pass an empty array for roles.
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

  //get primaryUrlSegment
  const primaryUrlSegment = getPrimaryUrlSegment(enteredUrlPath);

  //roles should always exist here
  const protectedPrimaryRoute: ProtectedRoute =
    protectedRoutes[primaryUrlSegment];
  if (protectedPrimaryRoute) {
    //if entry does not have children
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
          //check if the primary route matches

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
  successUrlPath: successUrlPath,
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
