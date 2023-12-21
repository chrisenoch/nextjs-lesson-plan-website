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

// const protectedRoutesAdmin = ["/jobs"];
// const protectedRoutesUser = ["/lessonplans", "/premium"];
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
  jobs: { roles: ["USER"] },
  lessonplans: { roles: ["ADMIN"] },
  //premium: { roles: ["ADMIN"] },
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

//STEP ZERO
//const allProtectedRoutes: Set<string> = getAllProtectedRoutes(protectedRoutes);

// STEP ONE
// First check if route protected
// get all map jkeys, put them in a set and decide if route is protected

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
  const urlPath = removeStartSlashIfPresent(
    request.nextUrl.pathname
  ).toLowerCase();

  const allProtectedRoutes: Set<string> =
    getAllProtectedRoutes(protectedRoutes);

  console.log("after const allProtectedRoutes");

  //superAdmin has access to all if superAdmin exists
  //To do?: Change superAdmin to an array so that developer can assign multiple superAdmins
  if (superAdmin && userRoles.includes(superAdmin)) {
    return urlPath;
  }

  console.log("after superAdmin && userRoles.includes(superAdmin");

  //If route not protected, return unchanged url so user can go where he wants.
  if (!allProtectedRoutes.has(urlPath)) {
    console.log(
      "after if (!allProtectedRoutes.has(urlPath allProtectedRoutes and urlPath below"
    );
    console.log(allProtectedRoutes);
    console.log(urlPath);

    return urlPath;
  }
  //If get to here, route is protected.

  console.log("after if (!allProtectedRoutes.has(urlPath)");

  // If user doesn't have a role. E.g. he does not have an auth cookie or if his token is invalid.
  // To do?: Change so that developer can add different failureRedirectPaths for different urls in 'protectedRoutes.'
  if (userRoles.length < 1) {
    return notLoggedInRedirectUrlPath;
  }

  console.log("after if (userRoles.length < 1)");

  //get primaryUrlSegment
  const primaryUrlSegment = getPrimaryUrlSegment(urlPath);

  console.log(
    "after primaryUrlSegment, primaryUrlSegment: " + primaryUrlSegment
  );

  //roles should alwasy exist here
  const protectedRoute: ProtectedRoute = protectedRoutes[primaryUrlSegment];
  if (protectedRoute) {
    console.log("after if (protectedRoute)");
    //if entry does not have children
    if (!isProtectedRouteChildren(protectedRoute)) {
      console.log("after: if (!isProtectedRouteChildren(protectedRoute))");
      const requiredRolesThatUserHas = protectedRoute.roles.filter((role) =>
        userRoles.includes(role)
      );
      if (requiredRolesThatUserHas.length > 0) {
        console.log("after: if (requiredRolesThatUserHas.length > 0) ");
        //user is authorised
        return urlPath;
      } else {
        console.log("after: ELSE (requiredRolesThatUserHas.length > 0) ");
        return incorrrectRoleRedirectUrlPath;
      }
    } else {
      //if entry does not have children
      //to do
      console.log("entry no children ");
    }
  } else {
    // If get to here, there has been an error. At this point, we know that the route
    // is protected and so allowedRoles should have a value.
    console.log("in else error ");
    return notLoggedInRedirectUrlPath;
  }

  // Object.entries(protectedRoutes).forEach(
  //   ([primaryRoute, protectedRoute]: [string, ProtectedRoute]) => {
  //     if (primaryRoute === primaryUrlSegment) {
  //       //if entry does not have children
  //       if (!isProtectedRouteChildren(protectedRoute)){
  //         allowedRoles = protectedRoute.roles;
  //         //return from forEach because the first match
  //       }

  //     }
  //   }
  // );

  // If no 'primaryRoute === primaryUrlSegment' match, return failuReredirectUrl
  // because there has been an error.

  //loop over protectedRoutes object keys.
  //If primaryUrlSegment matches any object key:
  //Check if children exists
  //----If children DOES NOT exist:
  //--------Get allowed roles for route -> protectedRoutes.<primaryUlSegment>.roles
  //--------Check if user role is in returned roles. Use Set Intersection method?
  //------------if yes, return urlPath
  //------------If no return failureRedirectUrlPath
  //----If children EXISTS:
  //---------reverse the children array
  //---------loop over children array
  //------------------loop over each array entry
  //---------------------------loop over object entries
  //---------------------------remove any trailing slashes of the key
  //---------------------------see if urlPath is included in the key
  //---------------------------first one that matches, return the value (which will be the roles)
  //---------------------------Check if user role is in returned roles. Use Set Intersection method?
}

//NEW STRATEGY

//Check if next-wrapper an if so, return the url
//At the end of this stage we need the relative url to redirect to upon success. Called newRelativeUrl in the next-wrapper function
//Al ready have the method if includes next-wrapper. Now I need to get it if it does not.

//STEP TWO. get user role (must match to the map keys later).
//checkPermissions will need to return the roles. Plural
// can separate with commas and then use string.split method
//Function: will need to accept an array of user roles.

//STEP THREE - boolean userHasRole/userIsLoggedIn

//let urlToReturn;
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
