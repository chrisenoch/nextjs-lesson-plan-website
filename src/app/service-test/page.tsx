"use client";

import SubscribeToService from "@/services/SubscribeToService";
import TestServiceParent from "@/services/ServiceParentComponent";
import EmitWithSimpleService from "@/services/EmitWithSimpleService";
import useEventEmitter from "@/customHooks/useEventEmitter";
import { useState } from "react";
import SubscribeToServiceTwo from "@/services/SubscribeToServiceTwo";

export default function ServicePage() {
  console.log("ServicePage rendered");
  //import dispatchCarousel from hook -> In hook-> const [dispatchCarousel] = useState<any>({});
  //In hook, ensure functions exist and object has been initialised.
  //In hook, If objectHasInit. Check for hasInit property?
  const [dispatchCarousel] = useState<any>({});
  const dispatchCarouselHook = useEventEmitter();

  return (
    <>
      {/* <button onClick={() => dispatchCarousel.boo("g", "h", "i")}>Boo</button>
      <button onClick={() => dispatchCarousel.sayHi()}>Say hi</button> */}
      <button onClick={() => dispatchCarouselHook.boo("g", "h", "i")}>
        Boo
      </button>
      <button onClick={() => dispatchCarouselHook.sayHi()}>Say hi</button>
      <TestServiceParent dispatchObject={dispatchCarouselHook}>
        <>
          <SubscribeToService dispatchObject={dispatchCarouselHook} />
          {/* <SubscribeToServiceTwo /> */}
          <EmitWithSimpleService dispatchObject={dispatchCarouselHook} />
        </>
      </TestServiceParent>
    </>
  );
}
