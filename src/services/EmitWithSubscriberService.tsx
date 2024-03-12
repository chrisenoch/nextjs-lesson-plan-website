"use client";

import { authStore } from "./SubscriberConfigObjectStore";
import { emit } from "./SubscriberService";
import { addGame } from "./GamesSlice";
import { addTopAdultPlayer, addTopChildPlayer } from "./TopPlayersSlice";
import { addBook } from "./BooksSlice";

export default function EmitWithSubscriberService() {
  const userLogin = authStore.get("userLogin"); // Will always be the same object so don't need to use useMemo.
  const userLogout = authStore.get("userLogout");

  return (
    <>
      <h1>Emitters</h1>
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
