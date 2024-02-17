export function getLastUrlPathSegment(urlPath: string) {
  let id = urlPath;
  if (urlPath.at(-1) === "/") {
    id = urlPath.slice(0, -1);
  }
  id = id.substring(id.lastIndexOf("/") + 1);
  return id;
}
