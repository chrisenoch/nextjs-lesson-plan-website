import { BooksSlice } from "./BooksSlice";
import { GamesSlice } from "./GamesSlice";
import { SubscriberConfigObject } from "./SubscriberService";
import { TopPlayersSlice } from "./TopPlayersSlice";
console.log("in store");
export const authStore = new Map<string, SubscriberConfigObject>(); //Most basic - A component in one component tree can emit and
//and a component in a different component tree can observe. Emit runs the subscribe function in the observing components.
//Based on the information they receive, the observing components decide if they want to re-render.
//The emit function can be found in SubscriberService.
export const booksStore = new Map<string, BooksSlice>(); //Slices offer full state management. The idea is to use them similar to how you use Redux.
export const gamesStore = new Map<string, GamesSlice | TopPlayersSlice>(); //You subscribe to slices not to stores. Slices are in the same store here for
//organisational purposes. In React devtools, they will appear in the same group.
export const mainStore = new Map<string, Map<string, SubscriberConfigObject>>();
//The main store is set as state in StoreClientWrapper The only reason we do this is so we can see
//the store and its state in React devtools. StoreClientWrapper wraps the entire app's component tree.
mainStore.set("gamesStore", gamesStore);
mainStore.set("booksStore", booksStore);
mainStore.set("authStore", authStore);

//Init subscriber objects where needed. Slices init the subscribers objects within the slice.
authStore.set("userLogin", {
  subscribers: new Set(),
});
authStore.set("userLogout", {
  subscribers: new Set(),
});
