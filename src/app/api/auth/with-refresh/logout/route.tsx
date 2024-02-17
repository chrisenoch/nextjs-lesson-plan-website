import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

//Logout and refresh are both under the 'with-refresh' directory so that we can target only these two paths with the Path attribute of the http-only refresh cookie.
//We only want the refresh cookie to be sent when absolutely necessary to reduce the risk of it being stolen. See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#path_attribute

//To do: Invalidate refresh token here in database

export async function POST(request: NextRequest) {
  revalidatePath("/");

  const nextResponse = NextResponse.json(
    { message: "JWT access cookie and refresh cookie deleted", isError: false },
    { status: 200 }
  );
  nextResponse.cookies.delete(process.env.ACCESS_TOKEN_COOKIE_NAME!);
  nextResponse.cookies.delete(process.env.REFRESH_TOKEN_COOKIE_NAME!);

  return nextResponse;
}
