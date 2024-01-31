import { LoginStatus } from "@/models/types/Auth/LoginStatus";
import {
  AppDispatch,
  reinitWasLastRefreshSuccessful,
  getAccessTokenWithRefreshToken,
  userLogout,
  selectLoginStatus,
} from "@/store";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// pollingIntervalInMs must be less than the expiry length of the jwt access token (set on server).
export default function useAutoLogoutWhenJwtTokenExpires(
  pollingInterval: number,
  timeBeforeAccessTokenExpiryToSendRefreshToken: number
) {
  console.log("useAutoLogoutWhenJwtTokenExpires renders");
  const loginStatus: LoginStatus = useSelector(selectLoginStatus);
  const { userInfo, wasLastRefreshSuccessful, wasLastRefresh } = useSelector(
    (state) => state.authSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const isAutoLogoutRunning = useRef<boolean>(false);
  // const hasBeenLoggedIn = useRef<boolean>(false);
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

  const sendRefreshToken = useCallback(() => {
    if (userInfo && loginStatus === "LOGGED_IN") {
      const tokenExpiry = new Date(userInfo.exp * 1000); //userInfo.exp is in seconds, new Date(value) is in milliseconds.
      //get the date X time from now

      //Start the timer to send the refresh token and get a new access token
      const timeUntilAutoLogout = tokenExpiry.valueOf() - Date.now();
      if (
        timeUntilAutoLogout - Date.now() <=
        timeBeforeAccessTokenExpiryToSendRefreshToken
      ) {
        console.log(
          "getAccessTokenWithRefreshToken will run in: " +
            (timeUntilAutoLogout -
              timeBeforeAccessTokenExpiryToSendRefreshToken)
        );
        console.log(
          "currentTime before refresh: " + new Date().toLocaleString()
        );
        console.log("currentTime (check) " + Date.now());
        console.log("tokenExpiry " + tokenExpiry.valueOf());

        refreshTokenTimeoutId.current = setTimeout(() => {
          console.log("getAccessTokenWithRefreshToken about to run");
          dispatch(getAccessTokenWithRefreshToken());
          console.log("getAccessTokenWithRefreshToken has just ran");
        }, timeUntilAutoLogout - timeBeforeAccessTokenExpiryToSendRefreshToken);

        console.log(
          "refreshTokenTimeoutId.current " + refreshTokenTimeoutId.current
        );
      }
    }
  }, [
    dispatch,
    loginStatus,
    timeBeforeAccessTokenExpiryToSendRefreshToken,
    userInfo,
  ]);

  const autoLogout = useCallback(() => {
    isAutoLogoutRunning.current = true;
    console.log("sending Logout request in autoLogout ");
    dispatch(userLogout());
    setRenderLogoutWarning({ hasAutoLoggedOut: true }); //Calling component informed and can then decide if it wants to show a message that explains why the user was logged out.
    dispatch(reinitWasLastRefreshSuccessful());

    isAutoLogoutRunning.current = false;
  }, [dispatch]);

  //Check the access token expiry date periodically and send refresh token just before the token expires.
  useEffect(() => {
    console.log("inside polling useEffect");
    if (
      !isAutoLogoutRunning.current &&
      loginStatus === "LOGGED_IN" &&
      !wasLastRefresh
    ) {
      //Clear any past timers to ensure multiple timers do not get triggered on re-render of useEffect. (Return useEffect clean-up fn is not called on
      //re-render of useEffect.)
      clearTimers();
      console.log("sending first refresh token in useEffect");
      sendRefreshToken();
    }

    return () => {
      clearTimers();
    };
  }, [dispatch, sendRefreshToken, wasLastRefresh, loginStatus]);

  //Show a warning and then right after log the user out if refresh token fails.
  //This is for when the refresh token has been revoked, changed or is no longer present when it
  //is expected to be.
  useEffect(() => {
    if (wasLastRefreshSuccessful === false && loginStatus === "LOGGED_IN") {
      console.log(
        "inside if ( wasLastRefreshSuccessful === false && loginStatus === 'LOGGED_IN') and about to run autoLogout"
      );
      clearTimers();
      autoLogout();
    }

    return () => {
      clearTimers();
    };
  }, [wasLastRefreshSuccessful, dispatch, autoLogout, loginStatus]);

  //Show a warning and then right after log the user out.
  //This is for when the refresh token has expired.
  //We cannot just rely on wasLastRefreshSuccessful because if we do this, then for a short time before logout,
  //requests will be sent non-stop to the refresh endpoint.
  useEffect(() => {
    if (wasLastRefresh && loginStatus === "LOGGED_IN") {
      clearTimers();
      console.log(
        "inside if (wasLastRefresh && userInfo) and about to set timer for autoLogout"
      );

      const tokenExpiry = new Date(userInfo.exp * 1000);
      const millisecondsUntilTokenExpiry = tokenExpiry.valueOf() - Date.now();

      autoLogoutTimeoutId.current = setTimeout(() => {
        autoLogout();
      }, millisecondsUntilTokenExpiry);
    }

    return () => {
      clearTimers();
    };
  }, [wasLastRefresh, dispatch, autoLogout, userInfo, loginStatus]);

  function clearTimers() {
    refreshTokenTimeoutId.current &&
      clearTimeout(refreshTokenTimeoutId.current);
    intervalId.current && clearInterval(intervalId.current);
    autoLogoutTimeoutId.current && clearInterval(autoLogoutTimeoutId.current);
  }

  return renderLogoutWarning;
}
