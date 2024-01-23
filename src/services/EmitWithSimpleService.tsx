"use client";

import { store } from "./SubscriberConfigObjectStore";
import { emit } from "./SimpleService";
import { addGame } from "./GamesSliceComponent";

export default function EmitWithSimpleService({
  dispatchObject,
}: {
  dispatchObject: any;
}) {
  const userLogin = store.get("userLogin"); // Will always be the same object so don't need to use useMemo.
  const userLogout = store.get("userLogout");
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
    </>
  );
}
