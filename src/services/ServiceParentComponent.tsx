"use client";

import { ReactElement } from "react";
import { store } from "./SubscriberConfigObjectStore";

export default function ServiceParentComponent({
  dispatchObject,
  children,
}: {
  dispatchObject: any;
  children: ReactElement;
}) {
  //Add userLogin SubscriberConfigObject to store
  store.set("userLogin", {
    subscribers: new Set(),
  });

  return (
    <>
      <button onClick={() => dispatchObject.boo("from parent")}>
        Boo from Parent
      </button>
      {children}
    </>
  );
}
