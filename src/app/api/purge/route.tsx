import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

/**
 * Revalidates the cache of a specified route. Useful for ISR so you do not have to rebuild te entire site if static content is added.
 * This function could be called from a CDN after content has been updated.
 * @param req - add the path to be purged to the query parameter p.
 * @example
 * 'https://<this-website-address>/api/purge?p=/<my-route-to-be-purged>' 'http://localhost:3000/api/purge?p=/blog-posts'
 * @todo Finish this, add authentication and test it.
 * @returns JSON object with the text "PURGE_ATTEMPTED for route:" + the value of the query parameter 'p'. Success status of the purge
 * is not returned because Next.js revalidatePath does not return a value.
 */
export async function GET(req: NextRequest) {
  //add query param or path to specifiy which type of function to run: https://nextjs.org/docs/app/api-reference/functions/revalidatePath
  const toPurge = req.nextUrl.searchParams.get("p");
  toPurge && revalidatePath(toPurge);
  return Response.json({
    purgeStatus: "Purge attempted for route: " + toPurge + " ",
  });
}
