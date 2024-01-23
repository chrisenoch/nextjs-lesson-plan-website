"use client";

import SubscriberOne from "@/services/SubscriberOne";
import ServiceParentComponent from "@/services/ServiceParentComponent";
import EmitWithSimpleService from "@/services/EmitWithSimpleService";
import useEventEmitter from "@/customHooks/useEventEmitter";
import SubscriberTwo from "@/services/SubscriberTwo";

export default function ServicePage() {
  console.log("ServicePage rendered");
  const dispatchCarouselHook = useEventEmitter();

  return (
    <>
      <button onClick={() => dispatchCarouselHook.boo("g", "h", "i")}>
        Boo
      </button>
      <button onClick={() => dispatchCarouselHook.sayHi()}>Say hi</button>
      <ServiceParentComponent dispatchObject={dispatchCarouselHook}>
        <>
          <SubscriberOne dispatchObject={dispatchCarouselHook} />
          <SubscriberTwo />
          <EmitWithSimpleService dispatchObject={dispatchCarouselHook} />
        </>
      </ServiceParentComponent>
    </>
  );
}
