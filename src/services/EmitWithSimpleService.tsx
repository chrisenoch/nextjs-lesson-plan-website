"use client";

import { emitUserLogin } from "./UserLoginWithSimpleService";
import { emitUserLogout } from "./UserLogoutWithSimpleService";
import { userLoginSubscriberConfigObject } from "./UserLogin";
import { store } from "./SubscriberConfigObjectStore";
import { emit } from "./SimpleService";
// import { emitUserLogin } from "./TestServiceThree";

export default function EmitWithSimpleService({
  dispatchObject,
}: {
  dispatchObject: any;
}) {
  const userLogin = store.get("userLogin"); // Will always be the same object so don't need to use useMemo.
  return (
    <>
      <h1>Emitter</h1>
      <button onClick={() => dispatchObject.boo(7, 8, 9)}>Boo</button>
      <button
        onClick={() => {
          userLogin && emit(userLogin);
        }}>
        Emit UserLogin
      </button>
      <button onClick={() => false}>Return false</button>
      <button onClick={() => emitUserLogout()}>Emit UserLogout</button>
    </>
  );
}
