import { LoginStatus } from "@/models/types/LoginStatus";
import {
  selectLoginStatus,
  selectLogoutCount,
} from "@/store/slices/with-thunks/auth-slice";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useRedirectWhenLoggedOut(redirectTo: string) {
  const loginStatus: LoginStatus = useSelector(selectLoginStatus);

  if (loginStatus === "LOGGED_OUT") {
    redirect(redirectTo);
  }
}
