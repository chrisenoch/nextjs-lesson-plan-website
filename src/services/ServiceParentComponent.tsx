"use client";

import { ReactElement, useEffect } from "react";
import { gamesStore, authStore } from "./SubscriberConfigObjectStore";

export default function ServiceParentComponent({
  dispatchObject,
  children,
}: {
  dispatchObject: any;
  children: ReactElement;
}) {
  console.log("ServiceParentComponent rendered");
  authStore.set("userLogin", {
    subscribers: new Set(),
  });
  authStore.set("userLogout", {
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
      authStore.delete("userLogin");
      authStore.delete("userLogout");
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
