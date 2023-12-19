import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TestCookiesPageContent from "./page-content";
import * as jose from "jose";

export default async function TestCookies() {
  const cookieStore = cookies();
  console.log("cookies below");
  console.log(cookieStore.getAll());
  console.log("cookie has jwt? ");
  const hasJWT = cookieStore.has("jwt");
  console.log(cookieStore.has("jwt"));
  console.log("cookies finished. now verifying jwt token");
  const accessToken = cookieStore.get("jwt");

  if (accessToken) {
    try {
      const { payload } = await jose.jwtVerify(
        accessToken.value,
        new TextEncoder().encode("my-secret")
      );
      console.log("payloa below");
      console.log(payload);
      return <TestCookiesPageContent />;
    } catch {
      redirect("/");
    }
  } else {
    redirect("/");
  }

  //   if (hasJWT) {
  //     return <TestCookiesPageContent />;
  //   } else {
  //     redirect("/");
  //     //return <h1>Not autenticated</h1>;
  //   }
}
