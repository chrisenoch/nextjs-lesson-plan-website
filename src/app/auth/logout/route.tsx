import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const nextResponse = NextResponse.json(
    { message: "JWT cookie deleted" },
    { status: 200 }
  );
  const isDeleted = nextResponse.cookies.delete("jwt");
  if (isDeleted) {
    return nextResponse;
  } else {
    return NextResponse.json(
      { error: "JWT cookie was not deleted" },
      { status: 400 }
    );
  }
}
