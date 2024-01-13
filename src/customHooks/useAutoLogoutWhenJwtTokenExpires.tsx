import {
  AppDispatch,
  reinitWasLastRefreshSuccessful,
  getAccessTokenWithRefreshToken,
  userLogout,
} from "@/store";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// pollingIntervalInMs must be less than the expiry length of the jwt access token (set on server).
export default function useAutoLogoutWhenJwtTokenExpires(
  pollingInterval: number,
  timeBeforeAccessTokenExpiryToSendRefreshToken: number
) {
  console.log("useAutoLogoutWhenJwtTokenExpires renders");
  const { userInfo, wasLastRefreshSuccessful, wasLastRefresh } = useSelector(
    (state) => state.authSlice
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
  console.log("renderLogoutWarning " + renderLogoutWarning.hasAutoLoggedOut);

  const [previousUserInfo, setPreviousUserInfo] = useState<any>(userInfo);
  if (userInfo !== previousUserInfo) {
    console.log("userInfos not equal");
    setPreviousUserInfo(userInfo);
  }

  //Just for testing. Delete this
  console.log("wasLastRefreshSuccessfulbelow");
  console.log(wasLastRefreshSuccessful);

  console.log("wasLastRefresh: " + wasLastRefresh);

  console.log("userInfo below");
  console.log(JSON.stringify(userInfo));

  const sendRefreshToken = useCallback(() => {
    if (userInfo && !wasLastRefresh) {
      const tokenExpiry = new Date(userInfo.exp * 1000); //userInfo.exp is in seconds, new Date(value) is in milliseconds.
      //get the date X time from now
      const timeInFuture = Date.now() + pollingInterval;

      //check if token will expire in the next X time
      if (timeInFuture > tokenExpiry.valueOf()) {
        const timeUntilAutoLogout = tokenExpiry.valueOf() - Date.now();
        console.log(
          "getAccessTokenWithRefreshToken will run in (" +
            timeUntilAutoLogout +
            " - " +
            timeBeforeAccessTokenExpiryToSendRefreshToken +
            "): " +
            (timeUntilAutoLogout -
              timeBeforeAccessTokenExpiryToSendRefreshToken)
        );
        refreshTokenTimeoutId.current = setTimeout(() => {
          console.log("getAccessTokenWithRefreshToken about to run");
          dispatch(getAccessTokenWithRefreshToken());
          console.log("getAccessTokenWithRefreshToken has just ran");
        }, timeUntilAutoLogout - timeBeforeAccessTokenExpiryToSendRefreshToken);
      }
    }
  }, [
    dispatch,
    pollingInterval,
    timeBeforeAccessTokenExpiryToSendRefreshToken,
    userInfo,
    wasLastRefresh,
  ]);

  const autoLogout = useCallback(() => {
    isAutoLogoutRunning.current = true;
    console.log("sending Logout request in autoLogout ");
    dispatch(userLogout());
    setRenderLogoutWarning({ hasAutoLoggedOut: true }); //Calling component informed and can then decide if it wants to show a message that explains why the user was logged out.
    dispatch(reinitWasLastRefreshSuccessful());

    isAutoLogoutRunning.current = false;
  }, [dispatch]);

  if (userInfo) {
    // So we don't run autoLogout when the user hasn't even been logged in since page load.
    hasBeenLoggedIn.current = true;
  }

  //Check the access token expiry date periodically and send refresh token just before the token expires.
  useEffect(() => {
    if (!isAutoLogoutRunning.current && userInfo) {
      //Clear any past timers to ensure multiple timers do not get triggered on re-render of useEffect. (Return useEffect clean-up fn is not called on
      //re-render of useEffect.)
      clearTimers();
      console.log("sending first refresh token in useEffect");
      sendRefreshToken();

      intervalId.current = setInterval(() => {
        console.log("polling interval ran and sending refresh token");
        sendRefreshToken();
      }, pollingInterval);
    }

    return () => {
      clearTimers();
    };
  }, [userInfo, dispatch, sendRefreshToken, pollingInterval]);

  //Show a warning and then right after log the user out if refresh token fails.
  useEffect(() => {
    if (wasLastRefreshSuccessful === false && hasBeenLoggedIn.current) {
      console.log("inside autoLogout effect if condition");
      clearTimers();
      autoLogout();
    }

    return () => {
      clearTimers();
    };
  }, [wasLastRefreshSuccessful, dispatch, autoLogout]);

  function clearTimers() {
    refreshTokenTimeoutId.current &&
      clearTimeout(refreshTokenTimeoutId.current);
    intervalId.current && clearInterval(intervalId.current);
    autoLogoutTimeoutId.current && clearInterval(autoLogoutTimeoutId.current);
  }

  return renderLogoutWarning;
}
