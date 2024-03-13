"use client";

import { Box, Button, Typography } from "@mui/material";
import { authStore } from "./SubscriberConfigObjectStore";
import useSubscriber from "./useSubscriber";

export default function SubscriberWithHooks() {
  console.log("SubscriberWithHooks Component rendered");
  const {
    subscribeHelper: subscribeToLoginViaHook,
    unSubscribeHelper: unsubscribeFromLoginViaHook,
  } = useSubscriber("userLogin", authStore, true, () =>
    onUserLoginSubReceived("Dolly", "Parton")
  );

  const {
    subscribeHelper: subscribeToLoginViaHookTwo,
    unSubscribeHelper: unsubscribeFromLoginViaHookTwo,
  } = useSubscriber("userLogin", authStore, true, () =>
    onUserLoginSubReceived("Peter", "Piper")
  );

  const {
    subscribeHelper: subscribeToLogoutViaHook,
    unSubscribeHelper: unsubscribeFromLogoutViaHook,
  } = useSubscriber("userLogout", authStore, true, () =>
    onUserLogoutSubReceived("Bill", "Gates")
  );

  function onUserLoginSubReceived(firstName: string, secondName: string) {
    console.log(
      "Subscription runs in SubscriberWithHooks. Do sth because there was a userLogin. First name: " +
        firstName +
        ". Second name: " +
        secondName
    );
  }

  function onUserLogoutSubReceived(firstName: string, secondName: string) {
    console.log(
      "Subscription runs in SubscriberWithHooks. Do sth because there was a userLogout. First name: " +
        firstName +
        ". Second name: " +
        secondName
    );
  }

  return (
    <>
      <Typography component="h3" variant="h4">
        Component Tree 1
      </Typography>
      <Typography variant="subtitle1">(Subscriber - With Hooks)</Typography>
      <Box marginTop={2} marginBottom={1}>
        <Button
          variant="outlined"
          sx={{ textTransform: "capitalize", marginRight: 1 }}
          onClick={() => {
            unsubscribeFromLoginViaHook();
          }}>
          Unsubscribe - userLogin 1
        </Button>
        <Button
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            subscribeToLoginViaHook();
          }}>
          Susbcribe - userLogin 1
        </Button>
      </Box>
      <Box marginBottom={1}>
        <Button
          color="secondary"
          variant="outlined"
          sx={{ textTransform: "capitalize", marginRight: 1 }}
          onClick={() => {
            unsubscribeFromLoginViaHookTwo();
          }}>
          Unsubcribe - userLogin 2
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          sx={{ textTransform: "capitalize", marginRight: 1 }}
          onClick={() => {
            subscribeToLoginViaHookTwo();
          }}>
          Subscribe - userLogin 2
        </Button>
      </Box>
      <Box>
        <Button
          variant="outlined"
          color="success"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            unsubscribeFromLogoutViaHook();
          }}>
          Unsubscribe - userLogout
        </Button>
        <Button
          variant="outlined"
          color="success"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            subscribeToLogoutViaHook();
          }}>
          Subscribe - userLogout
        </Button>
      </Box>
    </>
  );
}
