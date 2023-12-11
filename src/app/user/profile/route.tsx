import { NextRequest, NextResponse } from "next/server";

//Ensure NextJS does not cache this request.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (userId) {
    if (Number.isNaN(userId)) {
      return NextResponse.json(
        { error: "The userId must be a number" },
        { status: 400 }
      );
    }

    //Fetch user from database. For now, fake the database call.
    const user = await fetchUser(parseInt(userId));

    if (user) {
      return NextResponse.json({
        id: user.id,
        firstName: user.firstName,
        email: user.email,
      });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
  } else {
    return NextResponse.json(
      { error: "No userId set in search param. You must set this." },
      { status: 400 }
    );
  }
}

//use this until set up database
function fetchUser(id: number) {
  if (id === 0) {
    return Promise.resolve({
      id: 0,
      firstName: "Christopher",
      email: "foo@bar.com",
    });
  } else {
    return Promise.reject("User not found");
  }
}
