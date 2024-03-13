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
      <Typography variant="h4">Component Tree 1</Typography>
      <Typography variant="subtitle1">(Subscriber - With Hooks)</Typography>
      <Box>
        <Button
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            unsubscribeFromLoginViaHook();
          }}>
          Unsubscribe from userLogin - 1
        </Button>
        <Button
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            subscribeToLoginViaHook();
          }}>
          Susbcribe to userLogin - 1
        </Button>
      </Box>
      <Box>
        <Button
          color="secondary"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            unsubscribeFromLoginViaHookTwo();
          }}>
          Unsubcribe from userLogin - 2
        </Button>
        <Button
          color="secondary"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            subscribeToLoginViaHookTwo();
          }}>
          Subscribe to userLogin - 2
        </Button>
      </Box>
      <Box>
        <Button
          color="success"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            unsubscribeFromLogoutViaHook();
          }}>
          Unsubscribe userLogout
        </Button>
        <Button
          color="success"
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            subscribeToLogoutViaHook();
          }}>
          Subscribe userLogout
        </Button>
      </Box>
    </>
  );
}
