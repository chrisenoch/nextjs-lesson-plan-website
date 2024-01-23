"use client";

import { useEffect, useMemo } from "react";
import {
  userLoginSubscribe,
  userLoginUnsubscribe,
} from "./UserLoginWithSimpleService";
import {
  userLogoutSubscribe,
  userLogoutUnsubscribe,
} from "./UserLogoutWithSimpleService";
import { userLoginSubscriberConfigObject } from "./UserLogin";
import { store } from "./SubscriberConfigObjectStore";

export default function SubscriberTwo() {
  console.log("SubscribeToServiceTwo Component rendered");

  //get object from central store
  const userLogin = store.get("userLogin"); // Will always be the same object so don't need to use useMemo.

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
    userLoginSubscribe(userLogin, userLoginSubscription);
    userLogoutSubscribe(userLogoutSubscription);

    return () => {
      userLoginUnsubscribe(userLogin, userLoginSubscription);
      userLogoutUnsubscribe(userLogoutSubscription);
    };
  }, [userLogin, userLoginSubscription, userLogoutSubscription]);

  function onUserLogin() {
    console.log(
      "Sub 2 - received in Component 2. Do sth because there was a userLogin"
    );
  }
  function onUserLogout() {
    console.log(
      "Sub 2 - received in Component 2. Do sth because there was a userLogout"
    );
  }

  return (
    <>
      <h1>Second component that subscribes</h1>
      <div>
        <button
          onClick={() =>
            userLoginUnsubscribe(userLogin, userLoginSubscription)
          }>
          Unsubscribe userLogin;
        </button>
        <button
          onClick={() => userLoginSubscribe(userLogin, userLoginSubscription)}>
          Re-subscribe userLogin.
        </button>
      </div>
      <div>
        <button onClick={() => userLogoutUnsubscribe(userLogoutSubscription)}>
          Unsubscribe userLogout.
        </button>
        <button onClick={() => userLogoutSubscribe(userLogoutSubscription)}>
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
