import { LoginStatus } from "@/models/types/Auth/LoginStatus";
import { selectLoginStatus } from "@/store/slices/with-thunks/auth-slice";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useRedirectWhenLoggedOut(
  redirectTo: string,
  shouldRedirectUponLogout: boolean = true
) {
  const loginStatus: LoginStatus = useSelector(selectLoginStatus);

  if (loginStatus === "LOGGED_OUT" && shouldRedirectUponLogout) {
    console.log("redirecting in my-jobs");
    redirect(redirectTo);
  }
}
