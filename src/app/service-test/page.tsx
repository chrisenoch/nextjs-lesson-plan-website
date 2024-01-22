"use client";

import TestService from "@/components/TestService";
import TestServiceParent from "@/components/TestServiceParent";
import TestServiceTwo from "@/components/TestServiceTwo";
import useEventEmitter from "@/customHooks/useEventEmitter";
import { useState } from "react";

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
          <TestService dispatchObject={dispatchCarouselHook} />
          <TestServiceTwo dispatchObject={dispatchCarouselHook} />
        </>
      </TestServiceParent>
    </>
  );
}
