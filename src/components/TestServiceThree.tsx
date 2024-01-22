//To do:unsubscribe function
//To do: use set instead of an array.

const userLogin: {
  onUserLogin: () => void;
  subscribers: { subscribe: () => void }[];
} = {
  onUserLogin,
  subscribers: [],
};

export function userLoginSubscribe(subscriberObject: {
  subscribe: () => void;
}) {
  userLogin.subscribers.push(subscriberObject);
}

//If don't export this, only this component can emit.
export function emitUserLogin() {
  //iterate subscribers and inform
  userLogin.subscribers.forEach((subscriber) => {
    subscriber.subscribe();
  });
}

//Can emit here, or any component that imports emitUserLogin can emit.
function onUserLogin() {
  console.log("userLoggedIn");
  emitUserLogin();
}
