import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole, isUserRole } from "./models/types/Auth/UserRole";
import { ProtectedRoutes } from "./models/types/Auth/ProtectedRoutes";
import {
  getAccessTokenRole,
  getUrlPathBasedOnPermissions,
  getUserRolesIfExist,
  handleSecureNextLink,
  removeExtraSlashes,
  removeStartSlashIfPresent,
} from "./middleware-functions";

let count = 0;
export async function middleware(request: NextRequest) {
  console.log("middleware count " + ++count);
  const originalPath = request.nextUrl.pathname.toLowerCase();
  const enteredUrlPathCleaned = removeExtraSlashes(request);

  //modify path if navigated from a SecueNextLink component
  const nextLinkRelativeUrl = handleSecureNextLink(request);
  if (nextLinkRelativeUrl) {
    return NextResponse.redirect(new URL(nextLinkRelativeUrl, request.url));
  }

  //check permissions and redirect if necessary
  const accessTokenRole = await getAccessTokenRole(request);
  const userRoles: UserRole[] = getUserRolesIfExist(accessTokenRole);
  userRoles.push("EVERYBODY"); //Everybody has this role (both logged-in and non-logged-in users)

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
//If the role is EVERYBODY, custom notLoggedInRedirectUrlPath and custom incorrectRoleRedirectUrlPath have no effect.
//This function does not protect child routes automatically. E.g. If you assign the admin role to the route 'lessonPlans'
//and do not include any children routes, then 'lessonPlans/1' will not be protected. //To do: Change this
const SIGNIN_REDIRECT_START = "/auth/signin?redirect=/";
const protectedRoutes: ProtectedRoutes = {
  lessonplans: {
    roles: ["EVERYBODY"],
    children: [
      {
        free: {
          roles: ["EVERYBODY"],
        },
      },
      {
        gold: {
          roles: ["USER"],
          notLoggedInRedirectUrlPath:
            SIGNIN_REDIRECT_START + "lessonplans/gold&member=gold",
        },
      },
      {
        saved: {
          roles: ["USER"],
          notLoggedInRedirectUrlPath:
            SIGNIN_REDIRECT_START + "lessonplans/saved",
        },
      },
    ],
  },
  "my-jobs": {
    roles: ["USER"],
    notLoggedInRedirectUrlPath: SIGNIN_REDIRECT_START + "my-jobs",
  },
  user: {
    roles: ["ADMIN"],
    notLoggedInRedirectUrlPath: SIGNIN_REDIRECT_START + "user",
    children: [
      {
        profile: {
          roles: ["USER"],
          notLoggedInRedirectUrlPath: SIGNIN_REDIRECT_START + "user/profile",
        },
      },
      {
        "profile/secret": {
          roles: ["ADMIN"],
          notLoggedInRedirectUrlPath:
            SIGNIN_REDIRECT_START + "user/profile/secret",
        },
      },
      {
        "profile/account": {
          roles: ["USER"],
          notLoggedInRedirectUrlPath:
            SIGNIN_REDIRECT_START + "user/profile/account",
        },
      },
    ],
  },
  test: {
    roles: ["EVERYBODY"],
    children: [{ foo: { roles: ["EVERYBODY"] } }],
  },
};
