"use client";

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
      <h1>Subscriber With Hooks</h1>
      <div>
        <button
          onClick={() => {
            unsubscribeFromLoginViaHook();
          }}>
          Unsubcribe from userLogin - 1
        </button>
        <button
          onClick={() => {
            subscribeToLoginViaHook();
          }}>
          Re-subscribe to userLogin - 1.
        </button>
        <button
          onClick={() => {
            unsubscribeFromLoginViaHookTwo();
          }}>
          Unsubcribe from userLogin - 2
        </button>
        <button
          onClick={() => {
            subscribeToLoginViaHookTwo();
          }}>
          Re-subscribe to userLogin - 2.
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            unsubscribeFromLogoutViaHook();
          }}>
          Unsubscribe userLogout.
        </button>
        <button
          onClick={() => {
            subscribeToLogoutViaHook();
          }}>
          Re-subscribe userLogout.
        </button>
      </div>
    </>
  );
}
