"use client";
import { useState } from "react";
import { SubscriberConfigObject } from "./SimpleService";
import { mainStore } from "./SubscriberConfigObjectStore";

//This is for my event and state management library.
export default function StoreClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("StoreClientWrapper rendered");
  //No setter. The only reason it is in useState, is so that we can access it in the devtools.
  //This component does nothing else.
  const [store] = useState(mainStore);

  return <> {children}</>;
}
