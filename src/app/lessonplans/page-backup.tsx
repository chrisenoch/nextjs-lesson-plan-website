import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jose from "jose";
import LessonPlansPageContent from "./page-content";
import { joseVerifyToken } from "@/functions/auth/check-permissions";

export default async function LessonPlansPage() {
  console.log("in lesson plans page");
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
      const { payload } = await joseVerifyToken(accessToken.value, "my-secret");

      console.log("payload below");
      console.log(payload);
      return <LessonPlansPageContent />;
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
