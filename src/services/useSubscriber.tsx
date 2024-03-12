import { useEffect, useMemo, useState } from "react";
import { subscribe, unsubscribe } from "./SubscriberService";

//The key is the callback
export default function useSubscriber(
  storeKey: string,
  store: any,
  hasSliceInit: boolean,
  callback: any
) {
  let isInit = false;
  if (hasSliceInit) {
    isInit = true;
  }

  const storeAction = store.get(storeKey);
  const subscription = useMemo(() => {
    return {
      subscribe: () => callback(),
    };
  }, [callback]);

  useEffect(() => {
    if (isInit) {
      storeAction && subscribe(storeAction, subscription);
    }

    return () => {
      storeAction && unsubscribe(storeAction, subscription);
    };
  }, [isInit, storeAction, subscription]);

  function subscribeHelper() {
    storeAction && subscribe(storeAction, subscription);
  }

  function unSubscribeHelper() {
    storeAction && unsubscribe(storeAction, subscription);
  }
  return {
    subscribeHelper,
    unSubscribeHelper,
  };
}
