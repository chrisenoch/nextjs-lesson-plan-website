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

const protectedRoutesAdmin = ["/jobs"];
const protectedRoutesUser = ["/lessonplans", "/premium"];
let count = 0;
export async function middleware(request: NextRequest) {
  console.log("middleware count " + ++count);
  const originalPath = request.nextUrl.pathname;
  let isUser = false;
  let isAdmin = false;
  let accessToken;

  //Get the authentication roles
  const authCookie = request.cookies.get("jwt");
  if (authCookie) {
    accessToken = authCookie.value;
    const isAdminPromise = checkPermissions("ADMIN", accessToken);
    isAdmin = await isAdminPromise;
    const isUserPromise = checkPermissions("USER", accessToken);
    isUser = await isUserPromise;
  }

  console.log("isAdmin " + isAdmin);
  console.log("isUser " + isUser);

  console.log("before handleAuthWithNextWrapperI 1, count " + count);
  handleAuthWithNextWrapperId(
    request,
    isAdmin,
    protectedRoutesAdmin,
    "/auth/signin"
  );
  console.log("before handleAuthWithNextWrapperI 2, count " + count);
  handleAuthWithNextWrapperId(
    request,
    isUser,
    protectedRoutesUser,
    "/auth/signin"
  );

  console.log("before handleAuth 1, count " + count);
  handleAuth(request, isAdmin, protectedRoutesAdmin, "/auth/signin");

  console.log("before handleAuth 2, count " + count);
  handleAuth(request, isUser, protectedRoutesUser, "/auth/signin");

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
  return NextResponse.next();
}
//
//Helper functions

function handleAuthWithNextWrapperId(
  request: NextRequest,
  isAuthenticated: boolean,
  protectedRoutesByRole: string[],
  authFailureRelativePath: string
) {
  const originalPath = request.nextUrl.pathname;

  console.log("originalPath in handleAuthWithNextWrapperId " + originalPath);
  if (originalPath.includes("/next-link-wrapper-id")) {
    console.log("originalPath includes next-link-wrapper-id");
    const newRelativeUrl = removeSecureNextLinkSuffix(originalPath);
    console.log("newrelativeUrl : " + newRelativeUrl);

    if (protectedRoutesByRole.includes(newRelativeUrl)) {
      console.log("if protectedRoutesByRole.includes(newRelativeUrl)");
      if (isAuthenticated) {
        console.log("isAuthenticated next-wrapper");
        console.log("request.url " + request.url);
        return NextResponse.redirect(new URL(newRelativeUrl, request.url));
      } else {
        console.log("is NOT Authenticated next-wrapper");
        console.log("request.url " + request.url);
        const urltoRedirectTo = new URL(authFailureRelativePath, request.url);
        console.log("url to redirect to in next-wrapper: " + urltoRedirectTo);
        return NextResponse.redirect(
          new URL(authFailureRelativePath, request.url)
        );
      }
    }
    //not a protected route, but route includes a next-link-wrapper-id
    return NextResponse.redirect(new URL(newRelativeUrl, request.url));
  }
}

function handleAuth(
  request: NextRequest,
  isAuthenticated: boolean,
  protectedRoutesByRole: string[],
  authFailureRelativePath: string
) {
  const originalPath = request.nextUrl.pathname;
  if (
    protectedRoutesByRole.includes(originalPath) &&
    !originalPath.includes("/next-link-wrapper-id")
  ) {
    if (isAuthenticated) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(authFailureRelativePath, request.url)
      );
    }
  }
}

function removeSecureNextLinkSuffix(originalPath: string) {
  const index = originalPath.indexOf("/next-link-wrapper-id");
  const newRelativeUrl = originalPath.substring(0, index);
  return newRelativeUrl;
}

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
  lessonplans: { roles: ["USER"] },
  premium: { roles: ["ADMIN"] },
  users: {
    roles: ["USER"],
    children: [
      { account: { roles: ["USER"] } },
      { "account/secrets": { roles: ["ADMIN"] } },
    ],
  },
  shop: {
    roles: ["USER"],
    children: [
      { fashion: { roles: ["USER"] } },
      { "fashion/secrets": { roles: ["ADMIN"] } },
    ],
  },
};

function getAllProtectedRoutes(protectedRoutes: ProtectedRoutes) {
  const allProtectedRoutes = new Set();
  Object.entries(protectedRoutes).forEach(
    ([primaryRoute, protectedRoute]: [string, ProtectedRoute]) => {
      allProtectedRoutes.add(primaryRoute);

      if (isProtectedRouteChildren(protectedRoute)) {
        Object.values(protectedRoute.children).forEach(
          (protectedRouteRolesByRoute: ProtectedRouteRolesByRoute) => {
            //loop over the role route-role pairs
            Object.keys(protectedRouteRolesByRoute).forEach(
              (secondaryRoute: string) => {
                allProtectedRoutes.add(primaryRoute + "/" + secondaryRoute);
              }
            );
          }
        );
      }
    }
  );
  return allProtectedRoutes;
}

// function getAllProtectedRoutes(protectedRoutes: ProtectedRoutes) {
//   const allProtectedRoutes = new Set();
//   Object.entries(protectedRoutes).forEach(
//     ([primaryRoute, protectedRoute]: [string, ProtectedRoute]) => {
//       allProtectedRoutes.add(primaryRoute);

//       if (isProtectedRouteChildren(protectedRoute)) {
//         Object.values(protectedRoute.children).forEach(
//           (protectedRouteRolesByRoute: ProtectedRouteRolesByRoute) => {
//             //loop over the role route-role pairs
//             Object.keys(protectedRouteRolesByRoute).forEach(
//               (secondaryRoute: string) => {
//                 allProtectedRoutes.add(primaryRoute + "/" + secondaryRoute);
//               }
//             );
//           }
//         );
//       }
//     }
//   );
//   return allProtectedRoutes;
// }

function getUrl(request: NextRequest, role: UserRole) {
  if (role === "ADMIN") {
    //To do: change to return the route requested
    return true;
  }
}

//NEW STRATEGY
//STEP ONE
//First check if route protected
// get all map jkeys, put them in a set and decide if route is protected

//STEP TWO. get user role (must match to the map keys later).
//checkPermissions will need to return the roles. Plural
//STEP THREE - boolean userHasRole/userIsLoggedIn

//let urltoreturn;
//STEP FOUR
// if (includes-next-wrapper-id){
//urltoreturn = getUrlNextWrapper
// } else {
//urltoreturn = getUrl
// }

//Option 1
//getUrl nextWrapper function
//Will need to take into account all roles
// function to get the correct url to return

// object {"Admin": {protectedRoutesAdmin[]
//                  authFailureRedirectRelativePath:foo,
//                  incorrectRoleRedirectRelativePath:bar //because if logged in, we redirect to home not login page
//
//                   }}
//          "User": {protectedRoutesUser[]
//                  authFailureRedirectRelativePath:foo,
//                  incorrectRoleRedirectRelativePath:bar //because if logged in, we redirect to home not login page
//
//                   }}

//Imagine user -> /user-profile     admin admin-profile
//How decide if admin can access both?
//Option 1: Admin can access all user routes
//If so, we just add all other routes to admin route and same as below
//In this acse, order of map matters
//Option 2: Must add route to both user and admin
//Problem with option 2: if add route to user and not to admin. Admin won't be able to access.
//Option 3 - hybrid: admin accesses all routes below
//other routes must be added individually
//Key of "SUPER-ADMIN" - only one with access to all
//If do not want SUPER-ADMIN to have access to all. Pass undefined or don't include it.

//STEP FIVE
//Map get routes of all roles.

//STEP SIX
// add all roles into one array. merge the difefrent arrays.

//STEP SEVEN:
//If user has several roles, failureCallback will conflict. Solution:1One failureredirect for all.
// One hasRole but not authorised redirect for all.

//STEP EIGHT
//Add :ANY PARAM
//E.g. users/:ANY/profile  :ANY could be any number
