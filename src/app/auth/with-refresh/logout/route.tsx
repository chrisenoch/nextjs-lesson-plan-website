import { NextRequest, NextResponse } from "next/server";

//Logout and refresh are both under the 'with-refresh' directory so that we can target only these two paths with the Path attribute of the http-only refresh cookie.
//We only want the refresh cookie to be sent when absolutely necessary to reduce the risk of it being stolen. See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#path_attribute
export async function POST(request: NextRequest) {
  const nextResponse = NextResponse.json(
    { message: "JWT access cookie and refresh cookie deleted" },
    { status: 200 }
  );
  const isDeleted = nextResponse.cookies.delete("jwt");
  const isRefreshDeleted = nextResponse.cookies.delete("jwt-refresh");
  if (isDeleted && isRefreshDeleted) {
    return nextResponse;
  } else if (isDeleted && !isRefreshDeleted) {
    return NextResponse.json(
      { error: "Refresh JWT cookie was not deleted" },
      { status: 400 }
    );
  } else if (!isDeleted && isRefreshDeleted) {
    return NextResponse.json(
      { error: "Access JWT cookie was not deleted" },
      { status: 400 }
    );
  }
}
