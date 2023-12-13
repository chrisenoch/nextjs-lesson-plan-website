import { NextRequest, NextResponse } from "next/server";

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
