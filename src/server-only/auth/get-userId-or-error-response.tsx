import "server-only";
import { UserRole } from "@/models/types/UserRole";
import { NextRequest, NextResponse } from "next/server";
import { checkPermissions } from "./check-permissions";
import { getAccessTokenInfo } from "./get-access-token-info";

export async function getUserIdOrErrorResponse({
  request,
  failureMessage,
  validUserRoles,
  superAdmins,
}: {
  request: NextRequest;
  failureMessage: string;
  validUserRoles: UserRole[];
  superAdmins: UserRole[];
}) {
  const permissionStatus = await checkPermissions({
    request,
    accessTokenName: process.env.ACCESS_TOKEN_COOKIE_NAME!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    validUserRoles,
    superAdmins,
  });

  if (permissionStatus !== "SUCCESS") {
    return NextResponse.json(
      {
        message: failureMessage,
        isError: true,
      },
      { status: 401 }
    );
  }

  //get userId
  const accessTokenInfo = await getAccessTokenInfo({
    request,
    accessTokenName: process.env.ACCESS_TOKEN_COOKIE_NAME!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  });
  if (!accessTokenInfo) {
    return NextResponse.json(
      {
        message: failureMessage,
        isError: true,
      },
      { status: 401 }
    );
  }
  const userId = accessTokenInfo.id;
  return userId;
}
