"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { store } from "./SubscriberConfigObjectStore";
import {
  SubscriberConfigObject,
  subscribe,
  unsubscribe,
} from "./SimpleService";
import { useHydrated } from "@/customHooks/useHydrated";
import { selectTopAdultPlayers } from "./GamesSliceComponent";

export default function SliceSubscriber() {
  console.log("SliceSubscriber component rendered");

  //I understand that this should be available as parent components are rendered before child components.
  const gamesSlice = store.get("gamesSlice") as SubscriberConfigObject; // Will always be the same object so don't need to use useMemo.
  console.log("gamesSlice in SliceSubscriber ");
  console.log(gamesSlice);
  //To do: Set correct type and remove !
  const [games, setGames] = useState<string[]>([]);
  const isGamesInit = useRef<boolean>(false);

  //Extract to hook?
  if (gamesSlice && !isGamesInit.current) {
    setGames(gamesSlice.games);
    isGamesInit.current = true;
  }

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

  const topAdultPlayers = selectTopAdultPlayers();
  const renderedTopAdultPlayers = topAdultPlayers.map((player) => (
    <li key={player.firstName}>{player.firstName}</li>
  ));

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
      <h2>Top adult players</h2>
      <ul>{renderedTopAdultPlayers}</ul>
    </>
  );
}
