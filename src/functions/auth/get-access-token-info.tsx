"use server";

import { NextRequest } from "next/server";
import { joseVerifyToken } from "./check-permissions";

export async function getAccessTokenInfo({
  request,
  accessTokenName,
  accessTokenSecret,
}: {
  request: NextRequest;
  accessTokenName: string;
  accessTokenSecret: string;
}): Promise<null | {
  id: string;
  firstName: string;
  email: string;
  role: string;
}> {
  const accessToken = request.cookies.get(accessTokenName);
  if (accessToken) {
    try {
      const { payload: accessTokenPayload } = await joseVerifyToken(
        accessToken.value,
        accessTokenSecret
      );
      return {
        id: accessTokenPayload.id as string,
        firstName: accessTokenPayload.firstName as string,
        email: accessTokenPayload.email as string,
        role: accessTokenPayload.role as string,
      };
    } catch {
      return null;
    }
  } else {
    return null;
  }
}
