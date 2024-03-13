"use client";

import { authStore } from "./SubscriberConfigObjectStore";
import { emit } from "./SubscriberService";
import { addGame } from "./GamesSlice";
import { addTopAdultPlayer, addTopChildPlayer } from "./TopPlayersSlice";
import { addBook } from "./BooksSlice";
import { Button, Typography } from "@mui/material";
import ColorFactory from "@/components/presentation-c/ColorFactory";
import { green, orange } from "@mui/material/colors";

export default function EmitWithSubscriberService() {
  const userLogin = authStore.get("userLogin"); // Will always be the same object so don't need to use useMemo.
  const userLogout = authStore.get("userLogout");

  return (
    <>
      <Typography component="h3" variant="h4">
        Component Tree 4
      </Typography>
      <Typography variant="subtitle1" marginBottom={1}>
        (Event emitters)
      </Typography>
      <Button
        sx={{ textTransform: "capitalize", marginRight: 1 }}
        variant="contained"
        onClick={() => {
          userLogin && emit(userLogin);
        }}>
        Emit userLogin
      </Button>
      <Button
        sx={{ textTransform: "capitalize", marginRight: 1 }}
        variant="contained"
        onClick={() => {
          userLogout && emit(userLogout);
        }}>
        Emit userLogout
      </Button>
      <Button
        sx={{ textTransform: "capitalize", marginRight: 1 }}
        color="secondary"
        variant="contained"
        onClick={() => {
          addGame("Example Game");
        }}>
        Add game
      </Button>
      <Button
        sx={{ textTransform: "capitalize", marginRight: 1 }}
        color="secondary"
        variant="contained"
        onClick={() => {
          addBook("Example Book");
        }}>
        Add book
      </Button>
      <ColorFactory primary={orange[100]}>
        <Button
          sx={{ textTransform: "capitalize", marginRight: 1 }}
          color="primary"
          variant="contained"
          onClick={() => {
            addTopChildPlayer();
          }}>
          Add Top Child Player
        </Button>

        <Button
          sx={{ textTransform: "capitalize", marginRight: 1 }}
          color="primary"
          variant="contained"
          onClick={() => {
            addTopAdultPlayer();
          }}>
          Add Top Adult Player
        </Button>
      </ColorFactory>
    </>
  );
}
