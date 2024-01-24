import { emit } from "./SimpleService";
import { gamesStore } from "./SubscriberConfigObjectStore";

//To do, change type of the store.
const gamesSlice: {
  subscribers: Set<{ subscribe: () => void }>;
  slice: {
    games: string[];
  };
} = {
  subscribers: new Set(),
  slice: { games: [] },
};
gamesStore.set("gamesSlice", gamesSlice);

export function addGame(gameTitle: string) {
  const newGames = gamesSlice.slice.games.slice();
  newGames.push(gameTitle);
  gamesSlice.slice.games = newGames;
  emit(gamesSlice);
}

//Simulate a http request to pre-populate games. Could use generateStaticParams# here to increase speed.
setTimeout(() => {
  gamesSlice.slice.games = ["Mario", "Fifa", "Doom"];
  emit(gamesSlice);
}, 3000);

export default function GamesSliceComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("GamesSliceCompnent rendered");
  return <> {children}</>;
}
