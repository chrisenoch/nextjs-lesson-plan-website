import { useAppSelector } from "@/store/hooks";
import { selectUserSessionStatus } from "@/store/slices/with-thunks/auth-slice";
import { redirect } from "next/navigation";

export default function useRedirectWhenLoggedOut(
  redirectTo: string,
  shouldRedirectUponLogout: boolean = true
) {
  const sessionStatus = useAppSelector(selectUserSessionStatus);

  if (sessionStatus === "INACTIVE" && shouldRedirectUponLogout) {
    console.log("redirecting in my-jobs");
    redirect(redirectTo);
  }
}
