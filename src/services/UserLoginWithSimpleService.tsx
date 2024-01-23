import {
  SubscriberConfigObject,
  emit,
  subscribe,
  unsubscribe,
} from "./SimpleService";

export function userLoginSubscribe(
  subscriberConfigObject: SubscriberConfigObject | undefined,
  subscriberObj: { subscribe: () => void }
) {
  if (subscriberConfigObject) {
    subscribe(subscriberConfigObject, subscriberObj);
  }
}

export function userLoginUnsubscribe(
  subscriberConfigObject: SubscriberConfigObject | undefined,
  subscriberObj: { subscribe: () => void }
) {
  if (subscriberConfigObject) {
    unsubscribe(subscriberConfigObject, subscriberObj);
  }
  //unsubscribe(subscriberConfigObject, subscriberObj);
}

//If we don't export this, only this file can emit, but anybody can listen
export function emitUserLogin(
  subscriberConfigObject: SubscriberConfigObject | undefined
) {
  if (subscriberConfigObject) {
    emit(subscriberConfigObject);
  }
}
