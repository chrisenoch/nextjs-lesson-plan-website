"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { store } from "./SubscriberConfigObjectStore";
import {
  SubscriberConfigObject,
  subscribe,
  unsubscribe,
} from "./SimpleService";
import { useHydrated } from "@/customHooks/useHydrated";
import { TopPlayers, selectTopAdultPlayers } from "./GamesSliceComponent";

export default function SliceSubscriber() {
  console.log("SliceSubscriber component rendered");

  //I understand that this should be available as I believe parent components are rendered before child components.
  const gamesSlice = store.get("gamesSlice") as SubscriberConfigObject; // Will always be the same object so don't need to use useMemo.
  console.log("gamesSlice in SliceSubscriber ");
  const [games, setGames] = useState<string[]>([]);
  const [topAdultPlayers, setTopAdultPlayers] = useState<TopPlayers>([]);
  const isGamesInit = useRef<boolean>(false);

  //Extract to hook?
  if (gamesSlice && !isGamesInit.current) {
    setGames(gamesSlice.slice.games);
    const topAdultPlayers = selectTopAdultPlayers();
    setTopAdultPlayers(topAdultPlayers);
    isGamesInit.current = true;
  }

  //Should run when a new game has been added from a different component.
  const onAddGame = useCallback(() => {
    console.log("onAddGame has run. About to set new games array.");
    setGames(gamesSlice.slice.games); //At this point gamesSlice.games should have updated.
  }, [gamesSlice.slice.games]);

  const onAddAdultTopPlayer = useCallback(() => {
    console.log(
      "onAddAdultTopPlayer has run. About to set new adult top player."
    );
    const newAdultTopPlayers = selectTopAdultPlayers();
    setTopAdultPlayers(newAdultTopPlayers);
  }, []);

  const gamesSubscription = useMemo(() => {
    return {
      subscribe: onAddGame,
    };
  }, [onAddGame]);

  const topAdultPlayersSubscription = useMemo(() => {
    return {
      subscribe: onAddAdultTopPlayer,
    };
  }, [onAddAdultTopPlayer]);

  useEffect(() => {
    gamesSlice && subscribe(gamesSlice, gamesSubscription);
    gamesSlice && subscribe(gamesSlice, topAdultPlayersSubscription);

    return () => {
      gamesSlice && unsubscribe(gamesSlice, gamesSubscription);
      gamesSlice && unsubscribe(gamesSlice, topAdultPlayersSubscription);
    };
  }, [gamesSlice, gamesSubscription, topAdultPlayersSubscription]);

  const renderedTopAdultPlayers = topAdultPlayers.map((player) => (
    <li key={player.firstName}>{player.firstName}</li>
  ));

  const isHydrated = useHydrated();
  if (!isHydrated || gamesSlice.slice.games.length < 1) {
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
      <button onClick={() => selectTopAdultPlayers()}>
        Run selectTopAdultPlayers
      </button>
      <ul>{renderedTopAdultPlayers}</ul>
    </>
  );
}
