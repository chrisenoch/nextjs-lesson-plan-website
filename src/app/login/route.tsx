//possible bug: ensure NextJs does not cache the request.
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log("login called");

  //
  const res = await request.json();

  console.log("username below");
  console.log(res.username);
  console.log("password below");
  console.log(res.password);

  return Response.json({ res });
}
