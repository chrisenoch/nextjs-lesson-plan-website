import { selectLogoutCount } from "@/store/slices/with-thunks/auth-slice";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function useRedirectWhenLoggedOut(redirectTo: string) {
  const logoutCount = useSelector(selectLogoutCount);
  const [previousLogoutCount, setPreviousLogoutCount] =
    useState<number>(logoutCount);

  useEffect(() => {
    if (previousLogoutCount !== logoutCount) {
      setPreviousLogoutCount(logoutCount);
      redirect(redirectTo);
    }
  }, [logoutCount, previousLogoutCount, redirectTo]);
}
