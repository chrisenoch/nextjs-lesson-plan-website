export type SubscriberConfigObject = {
  subscribers: Set<{ subscribe: () => void }>;
};

export function subscribe(
  subscriberConfigObject: SubscriberConfigObject,
  subscriberObj: { subscribe: () => void }
) {
  subscriberConfigObject.subscribers.add(subscriberObj);
}

export function unsubscribe(
  subscriberConfigObject: SubscriberConfigObject,
  subscriberObj: { subscribe: () => void }
) {
  subscriberConfigObject.subscribers.delete(subscriberObj);
  console.log(
    "number of subscribers: " + subscriberConfigObject.subscribers.size
  );
}

export function emit(subscriberConfigObject: SubscriberConfigObject) {
  subscriberConfigObject.subscribers.forEach((subscriber) => {
    console.log("susbcriber below");
    console.log(subscriber);
    subscriber.subscribe();
  });
}
