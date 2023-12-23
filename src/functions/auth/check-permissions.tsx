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
  validUserRole,
  superAdmins,
}: {
  request: NextRequest;
  accessTokenName: string;
  accessTokenSecret: string;
  validUserRole: UserRole[];
  superAdmins?: UserRole[];
  callback: () => void;
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
        if (validUserRole.includes(userRoleFromAccessToken)) {
          permissionStatus = "SUCCESS";
          if (
            accessTokenPayload.id === request.nextUrl.searchParams.get("userId")
          ) {
            permissionStatus = "SUCCESS";
          } else {
            permissionStatus = "CUSTOM_RESPONSE";
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
