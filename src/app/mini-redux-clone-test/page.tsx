"use client";

import EmitWithSubscriberService from "@/services/EmitWithSubscriberService";
import SliceFetcher from "@/services/SliceFetcher";
import StoreClientWrapper from "@/services/StoreClientWrapper";
import SubscriberWithHooks from "@/services/SubscriberWithHooks";
import SubscriberWithoutHooks from "@/services/SubscriberWithOutHooks";

export default function MiniReduxClonePage() {
  console.log("MiniReduxClonePage rendered");
  return (
    <StoreClientWrapper>
      <SubscriberWithHooks />
      <SubscriberWithoutHooks />
      <br />
      <SliceFetcher />
      <EmitWithSubscriberService />
    </StoreClientWrapper>
  );
}