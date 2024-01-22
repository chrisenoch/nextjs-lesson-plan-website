"use client";

import { useMemo } from "react";
import { emitUserLogin } from "./TestServiceThree";

export default function TestServiceTwo({
  dispatchObject,
}: {
  dispatchObject: any;
}) {
  emitUserLogin();
  return (
    <>
      <button onClick={() => dispatchObject.boo(7, 8, 9)}>
        Boo from TestServiceTwo
      </button>
      <button onClick={() => emitUserLogin()}>
        Emit UserLogin from TestServiceTwo
      </button>
    </>
  );
}
