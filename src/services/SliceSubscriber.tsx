"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { store } from "./SubscriberConfigObjectStore";
import { subscribe, unsubscribe } from "./SimpleService";
import { useHydrated } from "@/customHooks/useHydrated";

export default function SliceSubscriber() {
  console.log("SliceSubscriber component rendered");

  const gamesSlice = store.get("gamesSlice"); // Will always be the same object so don't need to use useMemo.
  //To do: Set correct type and remove !
  const [games, setGames] = useState<string[]>(gamesSlice!.games);

  //Should run when a new game has been added from a different component.
  const onAddGame = useCallback(() => {
    console.log("onAddGame has run. About to set new games array.");
    setGames(gamesSlice.games); //At this point gamesSlice.games should have updated.
  }, [gamesSlice.games]);

  const gamesSubscription = useMemo(() => {
    return {
      subscribe: onAddGame,
    };
  }, [onAddGame]);

  useEffect(() => {
    gamesSlice && subscribe(gamesSlice, gamesSubscription);

    return () => {
      gamesSlice && unsubscribe(gamesSlice, gamesSubscription);
    };
  }, [gamesSlice, gamesSubscription]);

  const isHydrated = useHydrated();
  if (!isHydrated || gamesSlice.games.length < 1) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <h1>First games slice subscriber</h1>
      <div>
        <p>Games: {games}</p>
        <button
          onClick={() => {
            gamesSlice && unsubscribe(gamesSlice, gamesSubscription);
          }}>
          Unsubscribe games;
        </button>
        <button
          onClick={() => {
            gamesSlice && subscribe(gamesSlice, gamesSubscription);
          }}>
          Re-subscribe games.
        </button>
      </div>
    </>
  );
}
