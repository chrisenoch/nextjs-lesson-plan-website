import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

//To do: finish this and add authentication
export async function GET(req: NextRequest) {
  //add query param or path to specifiy which type of function to run: https://nextjs.org/docs/app/api-reference/functions/revalidatePath
  //improve purge function, make it resuable and return a success or fail in the response

  //request to specified route and store data.
  const toPurge = req.nextUrl.searchParams.get("p");
  console.log(toPurge);
  //revalidate the path
  //another request to specified route
  // if successful, indicate in response
  //if fail, indicate in response

  toPurge && revalidatePath(toPurge);
  return Response.json({ purgeStatus: true });
}
