"use client";

import { ReactElement, useEffect } from "react";
import { store } from "./SubscriberConfigObjectStore";

export default function ServiceParentComponent({
  dispatchObject,
  children,
}: {
  dispatchObject: any;
  children: ReactElement;
}) {
  store.set("userLogin", {
    subscribers: new Set(),
  });
  store.set("userLogout", {
    subscribers: new Set(),
  });
  // const gamesSlice: {
  //   subscribers: Set<{ subscribe: () => void }>;
  //   games: string[];
  // } = {
  //   subscribers: new Set(),
  //   games: [],
  // };
  // store.set("gamesSlice", gamesSlice);

  useEffect(() => {
    return () => {
      console.log("store objects being deleted in useEffect return");
      store.delete("userLogin");
      store.delete("userLogout");
    };
  }, []);

  return (
    <>
      <button onClick={() => dispatchObject.boo("from parent")}>
        Boo from Parent
      </button>
      {children}
    </>
  );
}
