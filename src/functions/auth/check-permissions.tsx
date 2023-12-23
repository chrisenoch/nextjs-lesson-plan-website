"use server";

import { UserRole } from "@/models/types/UserRole";
import { NextRequest } from "next/server";
import * as jose from "jose";

export async function joseVerifyToken(accessToken: string, secret: string) {
  const tokenData = await jose.jwtVerify(
    accessToken,
    new TextEncoder().encode(secret)
  );
  return tokenData;
}

export async function checkPermissions(
  request: NextRequest,
  validUserRole: UserRole
) {
  const accessToken = request.cookies.get("jwt");
  console.log("accessToken in c-p");
  console.log(accessToken);
  if (accessToken) {
    try {
      console.log("in try checkPermissions");
      const { payload: accessTokenPayload } = await jose.jwtVerify(
        accessToken.value,
        new TextEncoder().encode("my-secret")
      );
      const userRoleFromAccessToken = accessTokenPayload.role;

      if (userRoleFromAccessToken === validUserRole) {
        console.log("successful role check");
        return true;
      } else {
        console.log("failed role check");
        return false;
      }
    } catch {
      console.log("in catch in check-permissions");
      return false;
    }
  } else {
    return false;
  }
}
