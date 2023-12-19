"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function TestCookiesPageContent() {
  console.log("TestCookiesPageContent rendered");
  const { userInfo } = useSelector((state) => state.authSlice);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
    if (!userInfo && !isFirstRender) {
      redirect("/auth/signin");
    }
  }, [userInfo]);

  //   useEffect(() => {
  //     console.log("value of userinfo");
  //     console.log(userInfo);
  //   });

  return <h1>TestCookiesPageContent Loaded</h1>;
}
