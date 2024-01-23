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
// console.log("gamesSlice below");
// console.log(gamesSlice);

export function addGame(gameTitle: string) {
  const newGames = gamesSlice.games.slice();
  newGames.push(gameTitle);
  gamesSlice.games = newGames;
  emit(gamesSlice);
}

//Simulate a http request to pre-populate games. Could use generateStaticParams# here to increase speed.
setTimeout(() => {
  gamesSlice.games = ["Mario", "Fifa", "Doom"];
  emit(gamesSlice);
}, 3000);

export default function SliceComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <> {children}</>;
}
