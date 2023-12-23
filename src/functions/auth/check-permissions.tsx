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
  validUserRole: UserRole;
  superAdmins?: UserRole[];
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
        if (userRoleFromAccessToken === validUserRole) {
          return "SUCCESS";
        } else {
          return "ROLE_UNAUTHORISED";
        }
      }
      return "ROLE_UNRECOGNISED";
    } catch {
      return "TOKEN_INVALID";
    }
  } else {
    return "TOKEN_NOT_FOUND";
  }
}
