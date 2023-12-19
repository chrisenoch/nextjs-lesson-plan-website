"use client";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

export default function Loading({ redirectTo }: { redirectTo: string }) {
  useLayoutEffect(() => {
    redirect(redirectTo);
  });

  return <h1>Loading...</h1>;
}
