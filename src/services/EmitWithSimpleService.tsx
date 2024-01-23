"use client";

import { emitUserLogin } from "./ServiceOneWithSimpleService";
import { emitUserLogout } from "./ServiceTwoWithSimpleService";
import { userLoginSubscriberConfigObject } from "./UserLogin";
// import { emitUserLogin } from "./TestServiceThree";

export default function EmitWithSimpleService({
  dispatchObject,
}: {
  dispatchObject: any;
}) {
  const userLogin = userLoginSubscriberConfigObject;
  // emitUserLogin();
  // emitUserLogout();
  return (
    <>
      <h1>Emitter</h1>
      <button onClick={() => dispatchObject.boo(7, 8, 9)}>
        Boo from TestServiceTwo
      </button>
      <button onClick={() => emitUserLogin(userLogin)}>
        Emit UserLogin from TestServiceTwo
      </button>
      <button onClick={() => emitUserLogout()}>
        Emit UserLogout from TestServiceTwo
      </button>
    </>
  );
}
