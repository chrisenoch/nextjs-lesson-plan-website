"use client";

import { emit } from "./SimpleService";
import { store } from "./SubscriberConfigObjectStore";

console.log("Slice has run");
//To do, change type of the store.
const gamesSlice: {
  subscribers: Set<{ subscribe: () => void }>;
  games: string[];
} = {
  subscribers: new Set(),
  games: [],
};
store.set("gamesSlice", gamesSlice);
console.log("gamesSlice below");
console.log(gamesSlice);

// const gamesSlice = store.get("gamesSlice");
// console.log("gamesSlice below");
// console.log(gamesSlice);

export function addGame(gameTitle: string) {
  const newGames = gamesSlice.games.slice();
  newGames.push(gameTitle);
  gamesSlice.games = newGames;
  emit(gamesSlice);
}

export default function SliceComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <> {children}</>;
}

// const [state, dispatch] = useReducer((state, action) => {
//   const { type, payload } = action;
//   switch (action) {
//     case "ADD_FILE":
//       return [...state, payload];
//     default:
//       return state;
//   }
// }, []);
