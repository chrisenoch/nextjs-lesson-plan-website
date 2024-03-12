"use client";

import { useCallback, useRef, useState } from "react";
import { booksStore, gamesStore } from "./SubscriberConfigObjectStore";
import { useHydrated } from "@/customHooks/useHydrated";
import { TopPlayers, selectTopAdultPlayers } from "./TopPlayersSlice";
import { selectGames } from "./GamesSlice";
import { selectBooks } from "./BooksSlice";
import useSubscriber from "./useSubscriber";

export default function SliceSubscriber() {
  console.log("SliceSubscriber component rendered");

  useSubscriber("booksSlice", booksStore, true, () => {
    console.log("in use sub");
    setBooks(selectBooks());
  });
  const {
    subscribeHelper: addGameSubscribe,
    unSubscribeHelper: addGameUnSubscribe,
  } = useSubscriber("gamesSlice", gamesStore, true, () =>
    setGames(selectGames())
  );
  useSubscriber("topPlayersSlice", gamesStore, true, () => onAddTopPlayer());

  const [games, setGames] = useState<string[]>(selectGames);
  const [topAdultPlayers, setTopAdultPlayers] = useState<TopPlayers>(
    () => selectTopAdultPlayers().adultTopPlayers
  );
  const [books, setBooks] = useState<string[]>(selectBooks);

  const isFirstRenderOfAdultTopPlayers = useRef<boolean>(true);
  function onAddTopAdultPlayer() {
    const { adultTopPlayers: newAdultTopPlayers, hasChanged } =
      selectTopAdultPlayers();

    if (isFirstRenderOfAdultTopPlayers.current) {
      setTopAdultPlayers(newAdultTopPlayers);
      isFirstRenderOfAdultTopPlayers.current = false;
    } else if (hasChanged) {
      setTopAdultPlayers(newAdultTopPlayers);
    }
  }
  const onAddTopPlayer = useCallback(() => {
    onAddTopAdultPlayer();
  }, []);

  const renderedTopAdultPlayers = topAdultPlayers.map((player) => (
    <li key={player.id}>{player.firstName}</li>
  ));

  const isHydrated = useHydrated();
  if (!isHydrated) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <h1>Games and Books</h1>
      <div>
        <p>Games: {games}</p>
        <p>Books: {books}</p>
        <button
          onClick={() => {
            addGameUnSubscribe();
          }}>
          Unsubscribe games;
        </button>
        <button
          onClick={() => {
            addGameSubscribe();
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
