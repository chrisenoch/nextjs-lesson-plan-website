"use client";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Loading({ redirectTo }: { redirectTo: string }) {
  useLayoutEffect(() => {
    // if (session.isAuthenticated) {
    //   redirect("/lessonplans");
    // } else {
    //   redirect(redirectTo);
    // }
    redirect(redirectTo);
  });

  return <h1>Loading...</h1>;
}
