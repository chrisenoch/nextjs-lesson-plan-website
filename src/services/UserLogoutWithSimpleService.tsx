import {
  SubscriberConfigObject,
  emit,
  subscribe,
  unsubscribe,
} from "./SimpleService";

const userLogout: SubscriberConfigObject = {
  subscribers: new Set(),
};

export function userLogoutSubscribe(subscriberObj: { subscribe: () => void }) {
  subscribe(userLogout, subscriberObj);
}

export function userLogoutUnsubscribe(subscriberObj: {
  subscribe: () => void;
}) {
  console.log("unsubscribe userLogout ran");
  unsubscribe(userLogout, subscriberObj);
  console.log("number of subscribers: " + userLogout.subscribers.size);
}

//If don't export this, only this file can emit, but anybody can listen
export function emitUserLogout() {
  emit(userLogout);
}
