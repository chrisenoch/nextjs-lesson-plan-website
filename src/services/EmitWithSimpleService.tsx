"use client";

import { emitUserLogin } from "./SericeOneWithSimpleService";
import { emitUserLogout } from "./SericeTwoWithSimpleService";
// import { emitUserLogin } from "./TestServiceThree";

export default function EmitWithSimpleService({
  dispatchObject,
}: {
  dispatchObject: any;
}) {
  // emitUserLogin();
  // emitUserLogout();
  return (
    <>
      <h1>Emitter</h1>
      <button onClick={() => dispatchObject.boo(7, 8, 9)}>
        Boo from TestServiceTwo
      </button>
      <button onClick={() => emitUserLogin()}>
        Emit UserLogin from TestServiceTwo
      </button>
      <button onClick={() => emitUserLogout()}>
        Emit UserLogout from TestServiceTwo
      </button>
    </>
  );
}
