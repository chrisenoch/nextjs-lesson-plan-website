"use client";

import { useMemo } from "react";

export default function TestServiceTwo({
  dispatchObject,
}: {
  dispatchObject: any;
}) {
  return (
    <button onClick={() => dispatchObject.boo(7, 8, 9)}>
      Boo from TestServiceTwo
    </button>
  );
}
