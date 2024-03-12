"use client";

import { useEffect, useMemo } from "react";
import { authStore } from "./SubscriberConfigObjectStore";
import { subscribe, unsubscribe } from "./SubscriberService";

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
      <h1>Subscriber Without Hooks</h1>
      <div>
        <button
          onClick={() => {
            userLogin && unsubscribe(userLogin, userLoginSubscription);
          }}>
          Unsubscribe userLogin;
        </button>
        <button
          onClick={() => {
            userLogin && subscribe(userLogin, userLoginSubscription);
          }}>
          Re-subscribe userLogin.
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            userLogout && unsubscribe(userLogout, userLogoutSubscription);
          }}>
          Unsubscribe userLogout.
        </button>
        <button
          onClick={() => {
            userLogout && subscribe(userLogout, userLogoutSubscription);
          }}>
          Re-subscribe userLogout.
        </button>
      </div>
    </>
  );
}

function sayHi() {
  console.log("hi");
}

//   dispatcher.emit = function emit(...args) {
//     dispatcher.callback(...args);
//   };

// function sayWhat(...args) {
//     console.log(args);
//   }

//   dispatcher.callback = sayWhat;
