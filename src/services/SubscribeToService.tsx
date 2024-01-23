"use client";

import { useMemo } from "react";
import {
  userLoginSubscribe,
  userLoginUnsubscribe,
} from "./ServiceOneWithSimpleService";
import {
  userLogoutSubscribe,
  userLogoutUnsubscribe,
} from "./ServiceTwoWithSimpleService";
import { SubscriberConfigObject } from "./SimpleService";
import { userLoginSubscriberConfigObject } from "./UserLogin";
// import { userLoginSubscribe, userLoginUnsubscribe } from "./TestServiceThree";

export default function SubscribeToService({
  dispatchObject,
}: {
  dispatchObject: any;
}) {
  console.log("TestService Component rendered");

  //Doesn't work
  //Error message gives us a good clue.
  // const runWhenSubReceivedTwoRunner = useMemo(() => {
  //   return runWhenSubReceived("Jack", "Jones");
  //   //return run;
  // }, []);

  //Works
  // const runWhenSubReceivedTwoRunner = useMemo(() => {
  //   function run() {
  //     runWhenSubReceived("Jack", "Jones");
  //   }
  //   //return run;
  // }, []);

  //Shortened version
  // const runWhenSubReceivedTwoRunner = useMemo(
  //   () =>
  //     function run() {
  //       runWhenSubReceived("Jack", "Jones");
  //     },
  //   []
  // );

  const runWhenSubReceivedTwoRunner = useMemo(
    () => () => runWhenSubReceived("Jack", "Jones"),
    []
  );

  const mySubscriptionTwo = useMemo(() => {
    return {
      subscribe: runWhenSubReceivedTwoRunner,
    };
  }, [runWhenSubReceivedTwoRunner]);

  function runWhenSubReceived(firstName: string, secondName: string) {
    console.log(
      "Sub 2 - received in Component 1. Do sth because there was a userLogin. First name: " +
        firstName +
        ". Second name: " +
        secondName
    );
  }

  const runWhenSubReceivedBind = useMemo(
    () => runWhenSubReceived.bind(null, "Peter", "Piper"),
    []
  );

  const mySubscriptionOne = useMemo(() => {
    return {
      //subscribe: runWhenSubReceived,
      subscribe: runWhenSubReceivedBind,
    };
  }, [runWhenSubReceivedBind]);

  function runWhenSubReceivedTwo() {
    console.log(
      "Sub 2 - received in Component 1. Do sth because there was a userLogout"
    );
  }

  //get object from central store
  const userLogin = useMemo(() => userLoginSubscriberConfigObject, []);
  //userLoginSubscriberConfigObject.subscribers.add("{}");
  console.log("userLoginConfig in SubscribeToService ");
  console.log(userLogin);

  userLoginSubscribe(userLogin, mySubscriptionOne);
  userLogoutSubscribe(mySubscriptionTwo);

  const dispatcher = useMemo(() => dispatchObject, [dispatchObject]);
  dispatcher.boo = function boo(...args) {
    console.log(args);
  };
  dispatcher.sayHi = sayHi;

  return (
    <>
      <h1>My Service Subscriber 1</h1>
      <div>
        <button
          onClick={() => userLoginUnsubscribe(userLogin, mySubscriptionOne)}>
          Unsubscribe subscription 1;
        </button>
        <button
          onClick={() => userLoginSubscribe(userLogin, mySubscriptionOne)}>
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
