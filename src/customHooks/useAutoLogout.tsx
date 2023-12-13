import { AppDispatch } from "@/store";
import { userLogout } from "@/store/slices/with-thunks/auth-thunks";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function useAutoLogout(timeInMs: number) {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    //Clear any past timers to ensure multiple timers do not get triggered on re-render of useEffect. (Return useEffect clean-up fn is not called on
    //re-render of useEffect.)
    timeoutId.current && clearTimeout(timeoutId.current);
    intervalId.current && clearInterval(intervalId.current);

    autoLogout(userInfo, timeInMs, timeoutId, dispatch);

    intervalId.current = setInterval(() => {
      autoLogout(userInfo, timeInMs, timeoutId, dispatch);
    }, timeInMs);

    return () => {
      timeoutId.current && clearTimeout(timeoutId.current);
      intervalId.current && clearInterval(intervalId.current);
    };
  }, [userInfo, dispatch]);
}
function autoLogout(userInfo: any, timeInMs: number, timeoutId, dispatch) {
  if (userInfo) {
    const tokenExpiry = new Date(userInfo.exp * 1000); //userInfo.exp is in seconds, new Date(value) is in milliseconds.
    //get the date X minutes from now
    const timeInFuture = Date.now() + timeInMs;

    //check if token will expire in the next X minutes
    if (timeInFuture > tokenExpiry.valueOf()) {
      const timeUntilAutoLogout = tokenExpiry.valueOf() - Date.now();

      timeoutId.current = setTimeout(() => {
        dispatch(userLogout());
      }, timeUntilAutoLogout);
    }
  }
}
