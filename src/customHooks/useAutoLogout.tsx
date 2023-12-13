import { AppDispatch } from "@/store";
import { userLogout } from "@/store/slices/with-thunks/auth-thunks";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function useAutoLogout(timeInMs: number) {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  let isLoggedIn: boolean;
  if (userInfo?.isLoggedIn) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  console.log("isLoggedIn in useAutoLogout");
  console.log(isLoggedIn);

  useEffect(() => {
    //1_800_000ms = 30 mins
    console.log("in useAutoLogout useEffect");

    //Clear any past timers to ensure multiple timers do not get triggered on re-render of useEffect. (Return useeffect ffn is not called on
    //re-render os useEffect.)
    timeoutId.current && clearTimeout(timeoutId.current);
    intervalId.current && clearInterval(intervalId.current);

    autoLogout(isLoggedIn, userInfo, timeInMs, timeoutId, dispatch);

    intervalId.current = setInterval(() => {
      autoLogout(isLoggedIn, userInfo, timeInMs, timeoutId, dispatch);
    }, timeInMs);

    return () => {
      console.log("in useAutoLogout useEffect return function");
      timeoutId.current && clearTimeout(timeoutId.current);
      intervalId.current && clearInterval(intervalId.current);
    };
  }, [isLoggedIn, dispatch]);
}
function autoLogout(
  isLoggedIn: boolean,
  userInfo: any,
  timeInMs: number,
  timeoutId,
  dispatch
) {
  if (isLoggedIn) {
    console.log("starting interval in useEffect");

    console.log("userInffo object in useAutoLogout useEffect: ");
    console.log(userInfo);

    const tokenExpiry = new Date(userInfo.exp * 1000); //userInfo.exp is in seconds, new Date(value) is in milliseconds.
    //get the date X minutes from now
    const timeInFuture = Date.now() + timeInMs;

    console.log("timeInFuture: " + timeInFuture);
    console.log("tokenExpiry.valueOf() " + tokenExpiry.valueOf());

    //check if token will expire in the next X minutes
    if (timeInFuture > tokenExpiry.valueOf()) {
      console.log("if -> inside timeInFuture > tokenExpiry.valueOf()");

      const timeUntilAutoLogout = tokenExpiry.valueOf() - Date.now();

      console.log("timeUntilAutoLogout: " + timeUntilAutoLogout);
      timeoutId.current = setTimeout(() => {
        console.log("inside setTimeout with value of timeUntilAutoLogout");
        dispatch(userLogout());
      }, timeUntilAutoLogout);
    }
  }
}
