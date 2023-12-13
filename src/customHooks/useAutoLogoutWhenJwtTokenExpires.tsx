import { AppDispatch } from "@/store";
import { userLogout } from "@/store/slices/with-thunks/auth-thunks";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//pollingIntervalInMs must be > warningTimeInMs
//pollingIntervalInMs must be less than the expiry length of the jwt access token (set on server).
export default function useAutoLogoutWhenJwtTokenExpires(
  pollingIntervalInMs: number,
  warningTimeInMs: number
) {
  if (pollingIntervalInMs <= warningTimeInMs) {
    throw new Error("autoLogoutTimeInMs must be greater than warningTimeInMs");
  }

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoLogoutTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const warningTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [renderWarning, setRenderWarning] = useState<boolean>(false);

  useEffect(() => {
    //Clear any past timers to ensure multiple timers do not get triggered on re-render of useEffect. (Return useEffect clean-up fn is not called on
    //re-render of useEffect.)
    autoLogoutTimeoutId.current && clearTimeout(autoLogoutTimeoutId.current);
    warningTimeoutId.current && clearTimeout(warningTimeoutId.current);
    intervalId.current && clearInterval(intervalId.current);

    autoLogout();

    intervalId.current = setInterval(() => {
      autoLogout();
    }, pollingIntervalInMs);

    return () => {
      autoLogoutTimeoutId.current && clearTimeout(autoLogoutTimeoutId.current);
      warningTimeoutId.current && clearTimeout(warningTimeoutId.current);
      intervalId.current && clearInterval(intervalId.current);
    };
  }, [userInfo, dispatch]);

  function autoLogout() {
    if (userInfo) {
      const tokenExpiry = new Date(userInfo.exp * 1000); //userInfo.exp is in seconds, new Date(value) is in milliseconds.
      //get the date X time from now
      const timeInFuture = Date.now() + pollingIntervalInMs;

      //check if token will expire in the next X time
      if (timeInFuture > tokenExpiry.valueOf()) {
        const timeUntilAutoLogout = tokenExpiry.valueOf() - Date.now();
        const timeUntilWarning = timeUntilAutoLogout - warningTimeInMs;

        warningTimeoutId.current = setTimeout(() => {
          setRenderWarning(true);
        }, timeUntilWarning);

        autoLogoutTimeoutId.current = setTimeout(() => {
          dispatch(userLogout());
        }, timeUntilAutoLogout);
      }
    }
  }

  return renderWarning;
}
