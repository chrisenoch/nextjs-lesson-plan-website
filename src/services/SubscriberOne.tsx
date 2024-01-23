"use client";

import { useEffect, useMemo } from "react";
import {
  userLoginSubscribe,
  userLoginUnsubscribe,
} from "./UserLoginWithSimpleService";
import { userLoginSubscriberConfigObject } from "./UserLogin";
import {
  userLogoutSubscribe,
  userLogoutUnsubscribe,
} from "./UserLogoutWithSimpleService";

export default function SubscriberOne({
  dispatchObject,
}: {
  dispatchObject: any;
}) {
  console.log("TestService Component rendered");

  //get object from central store
  const userLogin = useMemo(() => userLoginSubscriberConfigObject, []);

  const userLoginSubscription = useMemo(() => {
    return {
      subscribe: () => onUserLoginSubReceived("Peter", "Piper"),
    };
  }, []);

  const userLogoutSubscription = useMemo(() => {
    return {
      subscribe: () => onUserLogoutSubReceived("Jack", "Jones"),
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

  function onUserLoginSubReceived(firstName: string, secondName: string) {
    console.log(
      "Sub 2 - received in Component 1. Do sth because there was a userLogin. First name: " +
        firstName +
        ". Second name: " +
        secondName
    );
  }

  function onUserLogoutSubReceived(firstName: string, secondName: string) {
    console.log(
      "Sub 2 - received in Component 1. Do sth because there was a userLogout. First name: " +
        firstName +
        ". Second name: " +
        secondName
    );
  }

  const dispatcher = useMemo(() => dispatchObject, [dispatchObject]);
  dispatcher.boo = function boo(...args) {
    console.log(args);
  };
  dispatcher.sayHi = sayHi;

  return (
    <>
      <h1>First component that subscribes</h1>
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
