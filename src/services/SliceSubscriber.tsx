"use client";

import { useCallback, useRef, useState } from "react";
import { booksStore, gamesStore } from "./SubscriberConfigObjectStore";
import { useHydrated } from "@/customHooks/useHydrated";
import { TopPlayers, selectTopAdultPlayers } from "./TopPlayersSlice";
import { selectGames } from "./GamesSlice";
import { selectBooks } from "./BooksSlice";
import useSubscriber from "./useSubscriber";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import ColorFactory from "@/components/presentation-c/ColorFactory";
import { blue, orange, pink } from "@mui/material/colors";
import NotificationBox from "@/components/NotificationBox";

export default function SliceSubscriber() {
  console.log("***SliceSubscriber component rendered");

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
  const theme = useTheme();

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
    <Box
      key={player.id}
      component="li"
      sx={{
        padding: 0.5,
        marginRight: 0.5,
        display: "inline-block",
        borderRadius: 2,
        backgroundColor: pink[100],
      }}>
      {player.firstName}
    </Box>
  ));

  const isHydrated = useHydrated();
  if (!isHydrated) {
    return <h1>Loading</h1>;
  }

  const renderedGames = games.map((game, index) => (
    // I would not normally use the index as a Key, but the order won't change here as this is just a demo.
    <Box
      key={index}
      component="li"
      sx={{
        padding: 0.5,
        marginRight: 0.5,
        display: "inline-block",
        borderRadius: 2,
        backgroundColor: blue[100],
      }}>
      {game}
    </Box>
  ));

  const renderedBooks = books.map((book, index) => (
    // I would not normally use the index as a Key, but the order won't change here as this is just a demo.
    <Box
      key={index}
      component="li"
      sx={{
        padding: 0.5,
        marginRight: 0.5,
        display: "inline-block",
        borderRadius: 2,
        backgroundColor: orange[100],
      }}>
      {book}
    </Box>
  ));

  return (
    <>
      <Typography component="h3" variant="h4">
        Component Tree 3
      </Typography>
      <Typography variant="subtitle1">
        (Component that subscribes to slices)
      </Typography>
      <Box width="fit-content">
        <Box>
          <Box
            component="p"
            display="inline-block"
            marginRight={1}
            fontWeight={"fontWeightMedium"}>
            Games:
          </Box>
          <Box
            component="ul"
            sx={{
              display: "inline",
              px: 0,
            }}>
            {renderedGames}
          </Box>
        </Box>
        <Box>
          <Box
            component="p"
            display="inline-block"
            marginRight={1}
            marginTop={1}
            fontWeight={"fontWeightMedium"}>
            Books:
          </Box>
          <Box
            component="ul"
            sx={{
              display: "inline",
              px: 0,
            }}>
            {renderedBooks}
          </Box>
        </Box>
        <Box>
          <Button
            sx={{ textTransform: "capitalize", marginRight: 1 }}
            variant="outlined"
            onClick={() => {
              addGameUnSubscribe();
            }}>
            Unsubscribe - add games
          </Button>
          <Button
            sx={{ textTransform: "capitalize" }}
            variant="outlined"
            onClick={() => {
              addGameSubscribe();
            }}>
            Subscribe - add games
          </Button>
        </Box>
        <Divider sx={{ width: "100%", marginY: 3 }}></Divider>
      </Box>
      <Typography marginTop="16px" variant="h5">
        Top Adult Players
      </Typography>
      <Typography variant="subtitle1">(Component Tree 3)</Typography>
      <Box
        sx={{
          maxWidth: "600px",
        }}>
        <NotificationBox
          title="Equality function"
          message={
            "Component 3 susbcribes to TopPlayers slice. But it is only interested in top adult players. The component only re-renders when a new *adult player* has been added."
          }
          sxTitle={{ fontSize: "24px" }}
          sxOuterContainer={{
            alignItems: "start",
            marginTop: 2,
            width: "fit-content",

            mx: 0,
          }}
          sxInnerContainer={{
            alignItems: "start",
            mx: 0,
          }}
          variant={"info"}
        />
        <Box component="p">
          - Click <Box component="q">add top adult player</Box>
          and <Box component="q">add child player</Box> in the emitters section.
          Notice in the DevTools that the component only re-renders when an{" "}
          <Box component="strong" fontWeight="fontWeightMedium">
            adult player
          </Box>{" "}
          has been added.{" "}
          <Box component="strong" fontWeight="fontWeightMedium">
            the component is called SliceSubscriber.
          </Box>{" "}
        </Box>
      </Box>

      <Box
        component="p"
        display="inline-block"
        marginRight={1}
        marginTop={1}
        fontWeight={"fontWeightMedium"}>
        Top Adult Players:
      </Box>
      <Box
        component="ul"
        sx={{
          display: "inline",
          px: 0,
        }}>
        {renderedTopAdultPlayers}
      </Box>
    </>
  );
}
