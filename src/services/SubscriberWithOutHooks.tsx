"use client";

import { useEffect, useMemo } from "react";
import { authStore } from "./SubscriberConfigObjectStore";
import { subscribe, unsubscribe } from "./SubscriberService";
import { Box, Button, Typography } from "@mui/material";

export default function SubscriberWithoutHooks() {
  console.log("SubscriberWithoutHooks Component rendered");

  //get object from central store
  const userLogin = authStore.get("userLogin"); // Will always be the same object so don't need to use useMemo.
  const userLogout = authStore.get("userLogout");

  const userLoginSubscription = useMemo(() => {
    return {
      subscribe: onUserLogin,
    };
  }, []);

  const userLogoutSubscription = useMemo(() => {
    return {
      subscribe: onUserLogout,
    };
  }, []);

  useEffect(() => {
    userLogin && subscribe(userLogin, userLoginSubscription);
    userLogout && subscribe(userLogout, userLogoutSubscription);

    return () => {
      userLogin && unsubscribe(userLogin, userLoginSubscription);
      userLogout && unsubscribe(userLogout, userLogoutSubscription);
    };
  }, [userLogin, userLoginSubscription, userLogout, userLogoutSubscription]);

  function onUserLogin() {
    console.log(
      "Subscription runs in SubscriberWithNoHooks. Do sth because there was a userLogin"
    );
  }
  function onUserLogout() {
    console.log(
      "Subscription runs in SubscriberWithNoHooks. Do sth because there was a userLogout"
    );
  }

  return (
    <>
      <Typography component="h3" variant="h4">
        Component Tree 2
      </Typography>
      <Typography variant="subtitle1">(Subscriber - No Hooks)</Typography>
      <Box marginTop={2} marginBottom={1}>
        <Button
          variant="outlined"
          sx={{ textTransform: "capitalize", marginRight: 1 }}
          onClick={() => {
            userLogin && unsubscribe(userLogin, userLoginSubscription);
          }}>
          Unsubscribe - userLogin
        </Button>
        <Button
          variant="outlined"
          sx={{ textTransform: "capitalize", marginRight: 1 }}
          onClick={() => {
            userLogin && subscribe(userLogin, userLoginSubscription);
          }}>
          Subscribe - userLogin
        </Button>
      </Box>
      <Box>
        <Button
          variant="outlined"
          sx={{ textTransform: "capitalize", marginRight: 1 }}
          color="secondary"
          onClick={() => {
            userLogout && unsubscribe(userLogout, userLogoutSubscription);
          }}>
          Unsubscribe - userLogout
        </Button>
        <Button
          variant="outlined"
          sx={{ textTransform: "capitalize", marginRight: 1 }}
          color="secondary"
          onClick={() => {
            userLogout && subscribe(userLogout, userLogoutSubscription);
          }}>
          Subscribe - userLogout
        </Button>
      </Box>
    </>
  );
}
