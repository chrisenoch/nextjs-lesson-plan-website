"use server";

import { UserRole, isUserRole } from "@/models/types/UserRole";
import { NextRequest } from "next/server";
import * as jose from "jose";

export async function joseVerifyToken(accessToken: string, secret: string) {
  const tokenData = await jose.jwtVerify(
    accessToken,
    new TextEncoder().encode(secret)
  );
  return tokenData;
}

export async function checkPermissions({
  request,
  accessTokenName,
  accessTokenSecret,
  validUserRoles,
  superAdmins,
  callback,
}: {
  request: NextRequest;
  accessTokenName: string;
  accessTokenSecret: string;
  validUserRoles: UserRole[];
  superAdmins?: UserRole[];
  callback?: (
    request: NextRequest,
    accessTokenPayload: jose.JWTPayload
  ) => string;
}) {
  const accessToken = request.cookies.get(accessTokenName);
  if (accessToken) {
    try {
      const { payload: accessTokenPayload } = await joseVerifyToken(
        accessToken.value,
        accessTokenSecret
      );
      const userRoleFromAccessToken = accessTokenPayload.role;

      if (
        typeof userRoleFromAccessToken === "string" &&
        isUserRole(userRoleFromAccessToken)
      ) {
        if (superAdmins && superAdmins.includes(userRoleFromAccessToken)) {
          return "SUCCESS";
        }

        let permissionStatus;
        if (validUserRoles.includes(userRoleFromAccessToken)) {
          permissionStatus = "SUCCESS";

          //Only call the callback if the user has a valid role and user does not have a superAdmin role.
          if (callback) {
            permissionStatus = callback(request, accessTokenPayload);
          }
        } else {
          permissionStatus = "ROLE_UNAUTHORISED";
        }

        return permissionStatus;
      }
      return "ROLE_UNRECOGNISED";
    } catch {
      return "TOKEN_INVALID";
    }
  } else {
    return "TOKEN_NOT_FOUND";
  }
}

//Example callback:
// function callback(request: NextRequest, accessTokenPayload: jose.JWTPayload) {
//   let permissionStatus;
//   if (
//     request.nextUrl.searchParams.get("userId") === null ||
//     request.nextUrl.searchParams.get("userId") === undefined
//   ) {
//     permissionStatus = "INVALID_QUERY_PARAMETER(S)";
//   } else if (
//     accessTokenPayload.id === request.nextUrl.searchParams.get("userId")
//   ) {
//     permissionStatus = "SUCCESS";
//   } else {
//     permissionStatus = "ACCESS_DENIED_INVALID_USER_ID"; //Error message: Access Denied. You only have access to jobs for your own userId. Please check that you have entered the correct userId.
//   }
//   return permissionStatus;
// }
