"use client";

import { useMemo } from "react";
import { userLoginSubscribe } from "./TestServiceThree";

export default function TestService({
  dispatchObject,
}: {
  dispatchObject: any;
}) {
  console.log("TestService Component rendered");

  const mySubscription = {
    subscribe: runWhenSubReceived,
  };
  userLoginSubscribe(mySubscription);

  function runWhenSubReceived() {
    console.log("Sub received. Do sth because there was a userLogin");
  }

  const dispatcher = useMemo(() => dispatchObject, [dispatchObject]);
  dispatcher.boo = function boo(...args) {
    console.log(args);
  };
  dispatcher.sayHi = sayHi;

  return <h1>My Service</h1>;
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
