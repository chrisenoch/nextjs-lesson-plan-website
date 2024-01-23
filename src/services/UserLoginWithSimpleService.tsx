import {
  SubscriberConfigObject,
  emit,
  subscribe,
  unsubscribe,
} from "./SimpleService";

export function userLoginSubscribe(
  subscriberConfigObject: SubscriberConfigObject,
  subscriberObj: { subscribe: () => void }
) {
  subscribe(subscriberConfigObject, subscriberObj);
}

export function userLoginUnsubscribe(
  subscriberConfigObject: SubscriberConfigObject,
  subscriberObj: { subscribe: () => void }
) {
  unsubscribe(subscriberConfigObject, subscriberObj);
}

//If we don't export this, only this file can emit, but anybody can listen
export function emitUserLogin(subscriberConfigObject: SubscriberConfigObject) {
  emit(subscriberConfigObject);
}
