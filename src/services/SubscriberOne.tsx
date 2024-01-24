"use client";

import { useEffect, useMemo } from "react";

import { gamesStore } from "./SubscriberConfigObjectStore";
import { subscribe, unsubscribe } from "./SimpleService";

export default function SubscriberOne({
  dispatchObject,
}: {
  dispatchObject: any;
}) {
  console.log("TestService Component rendered");

  //get object from central store
  const userLogin = gamesStore.get("userLogin"); // Will always be the same object so don't need to use useMemo.
  const userLogout = gamesStore.get("userLogout");

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
    userLogin && subscribe(userLogin, userLoginSubscription);
    userLogout && subscribe(userLogout, userLogoutSubscription);

    return () => {
      userLogin && unsubscribe(userLogin, userLoginSubscription);
      userLogout && unsubscribe(userLogout, userLogoutSubscription);
    };
  }, [userLogin, userLoginSubscription, userLogout, userLogoutSubscription]);

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
