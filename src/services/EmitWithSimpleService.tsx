"use client";

import { emitUserLogin } from "./UserLoginWithSimpleService";
import { emitUserLogout } from "./UserLogoutWithSimpleService";
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
      <button onClick={() => dispatchObject.boo(7, 8, 9)}>Boo</button>
      <button onClick={() => emitUserLogin(userLogin)}>Emit UserLogin</button>
      <button onClick={() => emitUserLogout()}>Emit UserLogout</button>
    </>
  );
}
