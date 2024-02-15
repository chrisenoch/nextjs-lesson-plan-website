import { LoginStatus } from "@/models/types/Auth/LoginStatus";
import {
  getAccessTokenWithRefreshToken,
  userLogout,
  selectLoginStatus,
} from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useEffect, useRef, useState } from "react";

export default function useAutoLogoutWhenJwtTokenExpires(
  timeBeforeAccessTokenExpiryToSendRefreshToken: number
) {
  console.log("useAutoLogoutWhenJwtTokenExpires renders");
  const loginStatus: LoginStatus = useAppSelector(selectLoginStatus);
  const { userSession, wasLastRefreshSuccessful, wasLastRefresh } =
    useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const refreshTokenTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const autoLogoutTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [renderLogoutWarning, setRenderLogoutWarning] = useState<{
    hasAutoLoggedOut: boolean;
  }>({ hasAutoLoggedOut: false });

  useEffect(() => {
    console.log(
      "inside sendRefreshTokenJustBeforeAccessTokenExpires# useEffect"
    );
    //Check the access token expiry date periodically and send refresh token just before the token expires.
    function sendRefreshTokenJustBeforeAccessTokenExpires() {
      if (userSession && loginStatus === "LOGGED_IN") {
        const tokenExpiry = new Date(userSession.exp * 1000); //userSession.exp is in seconds, new Date(value) is in milliseconds.

        //Start the timer to send the refresh token and get a new access token
        const timeUntilAutoLogout = tokenExpiry.valueOf() - Date.now();
        console.log(
          "getAccessTokenWithRefreshToken will run in: " +
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

    if (
      loginStatus === "LOGGED_IN" &&
      !wasLastRefresh &&
      wasLastRefreshSuccessful !== false
    ) {
      //Clear any past timers to ensure multiple timers do not get triggered on re-render of useEffect. (Return useEffect clean-up fn is not called on
      //re-render of useEffect.)
      clearTimers();
      console.log("sending first refresh token in useEffect");
      sendRefreshTokenJustBeforeAccessTokenExpires();
    }

    return () => {
      clearTimers();
    };
  }, [
    dispatch,
    wasLastRefresh,
    loginStatus,
    wasLastRefreshSuccessful,
    userSession,
    timeBeforeAccessTokenExpiryToSendRefreshToken,
  ]);

  //This is for when the refresh token has been revoked, changed or is no longer present when it
  //is expected to be.
  useEffect(() => {
    if (wasLastRefreshSuccessful === false) {
      clearTimers();
      dispatch(userLogout());
    }
    return () => {
      clearTimers();
    };
  }, [wasLastRefreshSuccessful, dispatch, loginStatus]);

  //Show a warning and then right after log the user out.
  //This is for when the refresh token has expired.
  //We cannot just rely on wasLastRefreshSuccessful because if we do this, then for a short time before logout,
  //requests will be sent non-stop to the refresh endpoint.
  useEffect(() => {
    if (wasLastRefresh && userSession && loginStatus === "LOGGED_IN") {
      clearTimers();
      console.log("About to set timer for autoLogout");
      const tokenExpiry = new Date(userSession.exp * 1000);
      const millisecondsUntilTokenExpiry = tokenExpiry.valueOf() - Date.now();

      autoLogoutTimeoutId.current = setTimeout(() => {
        dispatch(userLogout());
        setRenderLogoutWarning({ hasAutoLoggedOut: true }); //Calling component informed and can then decide if it wants to show a message that explains why the user was logged out.
      }, millisecondsUntilTokenExpiry);
    }

    return () => {
      clearTimers();
    };
  }, [wasLastRefresh, dispatch, userSession, loginStatus]);

  function clearTimers() {
    refreshTokenTimeoutId.current &&
      clearTimeout(refreshTokenTimeoutId.current);
    autoLogoutTimeoutId.current && clearInterval(autoLogoutTimeoutId.current);
  }

  return renderLogoutWarning;
}
