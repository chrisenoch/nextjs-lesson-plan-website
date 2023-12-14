import {
  AppDispatch,
  reinitWasLastRefreshSuccessful,
  getAccessTokenWithRefreshToken,
  userLogout,
} from "@/store";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// pollingIntervalInMs must be less than the expiry length of the jwt access token (set on server).
export default function useAutoLogoutWhenJwtTokenExpires(
  pollingInterval: number,
  timeBeforeAccessTokenExpiryToSendRefreshToken: number
) {
  const { userInfo, wasLastRefreshSuccessful } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const isAutoLogoutRunning = useRef<boolean>(false);
  const hasBeenLoggedIn = useRef<boolean>(false);
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  const refreshTokenTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const autoLogoutTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [renderLogoutWarning, setRenderLogoutWarning] = useState<{
    hasAutoLoggedOut: boolean;
  }>({ hasAutoLoggedOut: false });

  //Just for testing. Delete this
  console.log("wasLastRefreshSuccessfulbelow");
  console.log(wasLastRefreshSuccessful);

  if (userInfo) {
    // So we don't run autoLogout when the user hasn't even logged in since page load.
    console.log("userInfo in if");
    console.log(userInfo);
    hasBeenLoggedIn.current = true;
  }

  //Check the access token expiry date periodically and send refresh token just before the token expires.
  useEffect(() => {
    if (!isAutoLogoutRunning.current && userInfo) {
      //Clear any past timers to ensure multiple timers do not get triggered on re-render of useEffect. (Return useEffect clean-up fn is not called on
      //re-render of useEffect.)
      clearTimers();
      sendRefreshToken();

      intervalId.current = setInterval(() => {
        console.log("polling interval ran");
        sendRefreshToken();
      }, pollingInterval);
    }

    return () => {
      clearTimers();
    };
  }, [userInfo, dispatch]);

  //Show a warning and then right after log the user out if refresh token fails.
  useEffect(() => {
    console.log("inside autoLogout effect");
    if (wasLastRefreshSuccessful === false && hasBeenLoggedIn.current) {
      clearTimers();
      autoLogout();
    }

    return () => {
      clearTimers();
    };
  }, [wasLastRefreshSuccessful, dispatch]);

  function sendRefreshToken() {
    if (userInfo) {
      const tokenExpiry = new Date(userInfo.exp * 1000); //userInfo.exp is in seconds, new Date(value) is in milliseconds.
      //get the date X time from now
      const timeInFuture = Date.now() + pollingInterval;

      //check if token will expire in the next X time
      if (timeInFuture > tokenExpiry.valueOf()) {
        const timeUntilAutoLogout = tokenExpiry.valueOf() - Date.now();
        console.log(
          "getAccessTokenWithRefreshToken will run in ( " +
            timeUntilAutoLogout +
            " - " +
            timeBeforeAccessTokenExpiryToSendRefreshToken +
            ": " +
            (timeUntilAutoLogout -
              timeBeforeAccessTokenExpiryToSendRefreshToken)
        );
        refreshTokenTimeoutId.current = setTimeout(() => {
          console.log("getAccessTokenWithRefreshToken about to run");
          dispatch(getAccessTokenWithRefreshToken());
          console.log("getAccessTokenWithRefreshToken about to ran");
        }, timeUntilAutoLogout - timeBeforeAccessTokenExpiryToSendRefreshToken);
      }
    }
  }

  function autoLogout() {
    isAutoLogoutRunning.current = true;
    console.log("sending logout request in autologout ");
    dispatch(userLogout());
    setRenderLogoutWarning({ hasAutoLoggedOut: true }); //Calling component informed and can then decide if it wants to show a message that explains why the user was logged out.
    dispatch(reinitWasLastRefreshSuccessful());

    isAutoLogoutRunning.current = false;
  }

  function clearTimers() {
    refreshTokenTimeoutId.current &&
      clearTimeout(refreshTokenTimeoutId.current);
    intervalId.current && clearInterval(intervalId.current);
    autoLogoutTimeoutId.current && clearInterval(autoLogoutTimeoutId.current);
  }

  return renderLogoutWarning;
}
