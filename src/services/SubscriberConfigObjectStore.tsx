import { BooksSlice } from "./BooksSliceComponent";
import { GamesSlice } from "./GamesSliceComponent";
import { SubscriberConfigObject } from "./SimpleService";
import { TopPlayersSlice } from "./TopPlayersSliceComponent";
console.log("in store");
//To do: Each store should have a specific type.
export const authStore = new Map<string, SubscriberConfigObject>();
export const gamesStore = new Map<string, GamesSlice | TopPlayersSlice>();
export const booksStore = new Map<string, BooksSlice>();

export const mainStore = new Map<string, Map<string, SubscriberConfigObject>>();
mainStore.set("gamesStore", gamesStore);
mainStore.set("booksStore", booksStore);
mainStore.set("authStore", authStore);
