import { getAccessTokenWithRefreshToken, userLogout } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { useEffect, useRef, useState } from "react";

export default function useHandleLoginStatus(
  timeBeforeAccessTokenExpiryToSendRefreshToken: number
) {
  console.log("useAutoLogoutWhenJwtTokenExpires renders");
  const { userSession, refreshSuccessStatus, wasLastRefresh } = useAppSelector(
    (state) => state.authSlice
  );
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
      "Inside sendRefreshTokenJustBeforeAccessTokenExpires# useEffect"
    );
    function sendRefreshTokenJustBeforeAccessTokenExpires() {
      console.log(userSession);
      console.log("session status " + userSession.status);

      if (userSession.status === "ACTIVE") {
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
      (userSession.status === "ACTIVE" &&
        !wasLastRefresh &&
        refreshSuccessStatus === "SUCCESS") ||
      refreshSuccessStatus === "CLEAN"
    ) {
      //Clear any past timers to ensure multiple timers do not get triggered on re-render of useEffect. (Return useEffect clean-up fn is not called on
      //re-render of useEffect.)
      clearTimers();
      console.log(
        "Calling sendRefreshTokenJustBeforeAccessTokenExpires# in useEffect"
      );
      sendRefreshTokenJustBeforeAccessTokenExpires();
    }

    return () => {
      clearTimers();
    };
  }, [
    dispatch,
    wasLastRefresh,
    refreshSuccessStatus,
    userSession,
    timeBeforeAccessTokenExpiryToSendRefreshToken,
  ]);

  //This is for when the refresh token has been revoked, changed or is no longer present when it
  //is expected to be.
  useEffect(() => {
    if (refreshSuccessStatus === "DENIED") {
      clearTimers();
      dispatch(userLogout());
    }
    return () => {
      clearTimers();
    };
  }, [refreshSuccessStatus, dispatch]);

  //Show a warning and then right after log the user out.
  //This is for when the refresh token has expired.
  //We cannot just rely on "refreshSuccessStatus === 'SUCCESS'"" because if we do this, then for a short time before logout,
  //requests will be sent non-stop to the refresh endpoint.
  useEffect(() => {
    if (wasLastRefresh && userSession.status === "ACTIVE") {
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
  }, [wasLastRefresh, dispatch, userSession]);

  function clearTimers() {
    refreshTokenTimeoutId.current &&
      clearTimeout(refreshTokenTimeoutId.current);
    autoLogoutTimeoutId.current && clearTimeout(autoLogoutTimeoutId.current);
  }

  return renderLogoutWarning;
}
