"use client";

import { ReactElement, useEffect } from "react";
import { gamesStore } from "./SubscriberConfigObjectStore";

export default function ServiceParentComponent({
  dispatchObject,
  children,
}: {
  dispatchObject: any;
  children: ReactElement;
}) {
  console.log("ServiceParentComponent rendered");
  gamesStore.set("userLogin", {
    subscribers: new Set(),
  });
  gamesStore.set("userLogout", {
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
      gamesStore.delete("userLogin");
      gamesStore.delete("userLogout");
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
