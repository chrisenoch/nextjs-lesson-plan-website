import { SubscriberConfigObject, emit } from "./SubscriberService";
import { gamesStore } from "./SubscriberConfigObjectStore";
import { delay } from "@/utils/delay";

export type GamesSlice = {
  subscribers: Set<{
    subscribe: () => void;
  }>;
  slice: {
    games: string[];
  };
};

const gamesSlice: GamesSlice = {
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

export function selectGames() {
  return gamesSlice.slice.games;
}

let hasInit = false;
export async function initGamesSlice() {
  if (!hasInit) {
    //Simulate a http request to pre-populate books. Could use generateStaticParams# here to increase speed.
    await delay(() => {
      gamesSlice.slice.games = ["Mario", "Fifa", "Doom"];
      emit(gamesSlice);
    }, 1000);
    hasInit = true;
  }
  return gamesSlice.slice;
}
