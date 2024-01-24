"use client";

import { gamesStore } from "./SubscriberConfigObjectStore";
import { emit } from "./SimpleService";
import { addGame } from "./GamesSliceComponent";
import {
  addTopAdultPlayer,
  addTopChildPlayer,
} from "./TopPlayersSliceComponent";
import { addBook } from "./BooksSliceComponent";

export default function EmitWithSimpleService({
  dispatchObject,
}: {
  dispatchObject: any;
}) {
  const userLogin = gamesStore.get("userLogin"); // Will always be the same object so don't need to use useMemo.
  const userLogout = gamesStore.get("userLogout");
  //const gamesSlice = store.get("gamesSlice");

  return (
    <>
      <h1>Emitter</h1>
      <button onClick={() => dispatchObject.boo(7, 8, 9)}>Boo</button>
      <button
        onClick={() => {
          userLogin && emit(userLogin);
        }}>
        Emit UserLogin
      </button>
      <button
        onClick={() => {
          userLogout && emit(userLogout);
        }}>
        Emit UserLogout
      </button>
      <button
        onClick={() => {
          addGame("Sonic");
        }}>
        Add game
      </button>
      <button
        onClick={() => {
          addTopChildPlayer();
        }}>
        Add Top Child Player
      </button>
      <button
        onClick={() => {
          addTopAdultPlayer();
        }}>
        Add Top Adult Player
      </button>
      <button
        onClick={() => {
          addBook("Treasure Island");
        }}>
        Add Book
      </button>
    </>
  );
}
