//To do: Subscribe and inform methods to another file
const userLogin: {
  subscriberFn: () => void;
  subscribers: Set<{ subscribe: () => void }>;
} = {
  subscriberFn,
  subscribers: new Set(),
};

export function userLoginSubscribe(subscriberObj: { subscribe: () => void }) {
  userLogin.subscribers.add(subscriberObj);
}

export function userLoginUnsubscribe(subscriberObj: { subscribe: () => void }) {
  console.log("unsubscribe ran");
  userLogin.subscribers.delete(subscriberObj);
  console.log("number of subscribers: " + userLogin.subscribers.size);
}

//If don't export this, only this file can emit, but anybody can listen
export function emitUserLogin() {
  //iterate subscribers and inform
  userLogin.subscribers.forEach((subscriber) => {
    subscriber.subscribe();
  });
}

//Can emit here directly, or from any file that imports emitUserLogin can emit.
function subscriberFn() {
  console.log("userLoggedIn");
  emitUserLogin();
}
