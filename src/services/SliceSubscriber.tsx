"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { booksStore, gamesStore } from "./SubscriberConfigObjectStore";
import {
  SubscriberConfigObject,
  subscribe,
  unsubscribe,
} from "./SimpleService";
import { useHydrated } from "@/customHooks/useHydrated";
import { TopPlayers, selectTopAdultPlayers } from "./TopPlayersSliceComponent";
import { GamesSlice } from "./GamesSliceComponent";
import { BooksSlice } from "./BooksSliceComponent";

export default function SliceSubscriber() {
  console.log("SliceSubscriber component rendered");

  //I understand that this should be available as I believe parent components are rendered before child components.
  const gamesSlice = gamesStore.get("gamesSlice") as GamesSlice; // Will always be the same object so don't need to use useMemo.
  const topPlayersSlice = gamesStore.get(
    "topPlayersSlice"
  ) as SubscriberConfigObject;
  const booksSlice = booksStore.get("booksSlice") as BooksSlice;
  const [games, setGames] = useState<string[]>([]);
  const [topAdultPlayers, setTopAdultPlayers] = useState<TopPlayers>([]);
  const [books, setBooks] = useState<string[]>([]);
  const areSlicesInit = useRef<boolean>(false);
  const isFirstRenderOfAdultTopPlayers = useRef<boolean>(true);

  //Extract to hook?
  if (gamesSlice && topPlayersSlice && booksSlice && !areSlicesInit.current) {
    console.log("booksSlice");
    console.log(booksSlice);
    setBooks(booksSlice.slice.books);
    setGames(gamesSlice.slice.games);
    const { adultTopPlayers } = selectTopAdultPlayers();
    setTopAdultPlayers(adultTopPlayers);
    areSlicesInit.current = true;
  }

  const onAddGame = useCallback(() => {
    console.log("onAddGame has run. About to set new games array.");
    setGames(gamesSlice.slice.games); //At this point gamesSlice.games should have updated.
  }, [gamesSlice.slice.games]);

  const onAddBook = useCallback(() => {
    console.log("onAddBook has run. About to set new books array.");
    //console.log(booksSlice);
    setBooks(booksSlice.slice.books); //At this point booksSlice.games should have updated.
  }, [booksSlice.slice.books]);

  const onAddAdultTopPlayer = useCallback(() => {
    console.log(
      "onAddAdultTopPlayer has run. About to set new adult top player."
    );
    const { adultTopPlayers: newAdultTopPlayers, hasChanged } =
      selectTopAdultPlayers();

    if (isFirstRenderOfAdultTopPlayers.current) {
      setTopAdultPlayers(newAdultTopPlayers);
      isFirstRenderOfAdultTopPlayers.current = false;
    } else if (hasChanged) {
      console.log("has changed: in hasChanged in onAddAdultTopPlayer");
      setTopAdultPlayers(newAdultTopPlayers);
    } else {
      console.log(
        "Has not changed: in else of hasChanged in onAddAdultTopPlayer"
      );
    }
  }, []);

  const booksSubscription = useMemo(() => {
    return {
      subscribe: onAddBook,
    };
  }, [onAddBook]);

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
    topPlayersSlice && subscribe(topPlayersSlice, topAdultPlayersSubscription);
    booksSlice && subscribe(booksSlice, booksSubscription);

    return () => {
      gamesSlice && unsubscribe(gamesSlice, gamesSubscription);
      topPlayersSlice &&
        unsubscribe(topPlayersSlice, topAdultPlayersSubscription);
      booksSlice && unsubscribe(booksSlice, booksSubscription);
    };
  }, [
    booksSlice,
    booksSubscription,
    gamesSlice,
    gamesSubscription,
    topAdultPlayersSubscription,
    topPlayersSlice,
  ]);

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
        <p>Books: {books}</p>
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
