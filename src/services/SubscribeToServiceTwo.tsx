"use client";

import { useMemo } from "react";
import {
  userLoginSubscribe,
  userLoginUnsubscribe,
} from "./SericeOneWithSimpleService";
import {
  userLogoutSubscribe,
  userLogoutUnsubscribe,
} from "./SericeTwoWithSimpleService";
// import { userLoginSubscribe, userLoginUnsubscribe } from "./TestServiceThree";

export default function SubscribeToServiceTwo() {
  console.log("SubscribeToServiceTwo Component rendered");

  const mySubscriptionOne = useMemo(() => {
    return {
      subscribe: runWhenSubReceived,
    };
  }, []);

  const mySubscriptionTwo = useMemo(() => {
    return {
      subscribe: runWhenSubReceivedTwo,
    };
  }, []);

  userLoginSubscribe(mySubscriptionOne);
  userLogoutSubscribe(mySubscriptionTwo);
  function runWhenSubReceived() {
    console.log(
      "Sub 2 - received in Component 2. Do sth because there was a userLogin"
    );
  }
  function runWhenSubReceivedTwo() {
    console.log(
      "Sub 2 - received in Component 2. Do sth because there was a userLogout"
    );
  }

  return (
    <>
      <h1>My Service Subscriber 2</h1>
      <div>
        <button onClick={() => userLoginUnsubscribe(mySubscriptionOne)}>
          Unsubscribe subscription 1;
        </button>
        <button onClick={() => userLoginSubscribe(mySubscriptionOne)}>
          Re-subscribe, susbcription 1.
        </button>
      </div>
      <div>
        <button onClick={() => userLogoutUnsubscribe(mySubscriptionTwo)}>
          Unsubscribe subscription 2.
        </button>
        <button onClick={() => userLogoutSubscribe(mySubscriptionTwo)}>
          Re-subscribe, susbcription 2.
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
