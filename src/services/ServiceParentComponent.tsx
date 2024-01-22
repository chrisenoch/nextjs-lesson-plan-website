"use client";

import { ReactElement } from "react";

export default function ServiceParentComponent({
  dispatchObject,
  children,
}: {
  dispatchObject: any;
  children: ReactElement;
}) {
  return (
    <>
      <button onClick={() => dispatchObject.boo("from parent")}>
        Boo from Parent
      </button>
      {children}
    </>
  );
}
