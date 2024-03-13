import { initBooksSlice, selectBooks } from "./BooksSlice";
import { initGamesSlice } from "./GamesSlice";
import SliceSubscriber from "./SliceSubscriber";
import { initTopPlayersSlice } from "./TopPlayersSlice";

export default async function SliceFetcher() {
  console.log("slice fetcher called");
  await Promise.allSettled([
    //allSettled because we do not want to abort if only one rejects.
    initBooksSlice(),
    initGamesSlice(),
    initTopPlayersSlice(),
  ]);

  return <SliceSubscriber />;
}
