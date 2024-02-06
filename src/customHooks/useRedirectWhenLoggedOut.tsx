import { LoginStatus } from "@/models/types/Auth/LoginStatus";
import { useAppSelector } from "@/store/hooks";
import { selectLoginStatus } from "@/store/slices/with-thunks/auth-slice";
import { redirect } from "next/navigation";

export default function useRedirectWhenLoggedOut(
  redirectTo: string,
  shouldRedirectUponLogout: boolean = true
) {
  const loginStatus: LoginStatus = useAppSelector(selectLoginStatus);

  if (loginStatus === "LOGGED_OUT" && shouldRedirectUponLogout) {
    console.log("redirecting in my-jobs");
    redirect(redirectTo);
  }
}
