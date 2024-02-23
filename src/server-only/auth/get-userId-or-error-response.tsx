import "server-only";
import { UserRole } from "@/models/types/Auth/UserRole";
import { NextRequest, NextResponse } from "next/server";
import { checkPermissions } from "./check-permissions";
import { getAccessTokenInfo } from "./get-access-token-info";

/**
 * @returns - an object with a userid property and an errorResponse property. If the user has permissions, userId will be present errorResponse 
 * will be undefined. If not, the userId will be undefined and errorResponse will be a Next.response object signifying an error.
 * @example
 * //If user does not have permissions:
 * {
    userId: undefined,
    errorResponse: NextResponse.json(
      {
        message: failureMessage,
        isError: true,
      },
      { status: 401 }
    );
  }
  //If user does have permissions:
 * {
    userId: "2"
    errorResponse: undefined
  }
 * 
 */
export async function getUserIdOnSuccessOrErrorResponse({
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
  const returnObject: {
    userId: string | undefined;
    errorResponse:
      | NextResponse<{ message: string; isError: boolean }>
      | undefined;
  } = {
    userId: undefined,
    errorResponse: undefined,
  };
  const permissionStatus = await checkPermissions({
    request,
    accessTokenName: process.env.ACCESS_TOKEN_COOKIE_NAME!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    validUserRoles,
    superAdmins,
  });

  if (permissionStatus !== "SUCCESS") {
    returnObject.errorResponse = NextResponse.json(
      {
        message: failureMessage,
        isError: true,
      },
      { status: 401 }
    );
    return returnObject;
  }

  //get userId
  const accessTokenInfo = await getAccessTokenInfo({
    request,
    accessTokenName: process.env.ACCESS_TOKEN_COOKIE_NAME!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  });
  if (!accessTokenInfo) {
    returnObject.errorResponse = NextResponse.json(
      {
        message: failureMessage,
        isError: true,
      },
      { status: 401 }
    );
    return returnObject;
  }
  returnObject.userId = accessTokenInfo.id;
  return returnObject;
}
