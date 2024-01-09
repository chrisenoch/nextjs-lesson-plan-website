import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useRedirectWhenLoggedOut(redirectTo: string) {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const { userInfo } = useSelector((state) => state.authSlice);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    }
    if (!userInfo && !isFirstRender) {
      redirect(redirectTo);
    }
  }, [isFirstRender, redirectTo, userInfo]);
}
