"use client";
import { session } from "@/session/session";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

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
