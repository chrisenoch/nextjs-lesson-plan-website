import {
  SubscriberConfigObject,
  emit,
  subscribe,
  unsubscribe,
} from "./SimpleService";

//If I pass this into all the functions, then can have different subscriptions per components?
//E.g. two carousels that are completely independet of each other.
//Define object inc entral store and then pass into the component.
const userLogin: SubscriberConfigObject = {
  subscribers: new Set(),
};

export function userLoginSubscribe(subscriberObj: { subscribe: () => void }) {
  subscribe(userLogin, subscriberObj);
}

export function userLoginUnsubscribe(subscriberObj: { subscribe: () => void }) {
  unsubscribe(userLogin, subscriberObj);
}

//If don't export this, only this file can emit, but anybody can listen
export function emitUserLogin() {
  emit(userLogin);
}
