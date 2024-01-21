"use client";
import { Box, Button, Grid, Stack, Typography, duration } from "@mui/material";
import Image from "next/image";
import { Carousel } from "./Carousel/Carousel";
import { useMemo, useState } from "react";
import {
  AutoPlay,
  AutoPlayDirection,
  Transitions,
} from "@/models/types/AutoPlay";

export default function Hero() {
  const [autoPlay, setAutoPlay] = useState<AutoPlay>({
    enableAutoPlay: true,
    direction: "LEFT",
    delay: 2000,
  });

  const transitions: Transitions = {
    durationMs: 1000,
    easingFunction: "ease-out",
  };

  function handleToggleAutoPlayDirection() {
    const newAutoPlay: AutoPlay = {
      ...autoPlay,
      direction:
        autoPlay.direction === "RIGHT"
          ? "LEFT"
          : ("RIGHT" as AutoPlayDirection),
    };
    setAutoPlay(newAutoPlay);
  }

  function handleToggleEnableAutoPlay() {
    console.log("in handleToggleAutoplay");
    const newAutoPlay: AutoPlay = {
      ...autoPlay,
      enableAutoPlay: !autoPlay.enableAutoPlay,
    };
    setAutoPlay(newAutoPlay);
  }

  function handleIncreaseAutoPlayDelay() {
    console.log("in handleToggleAutoplay");
    const newAutoPlay: AutoPlay = {
      ...autoPlay,
      delay: autoPlay.delay + 1000,
    };
    console.log("delay from aprent: " + newAutoPlay.delay);
    setAutoPlay(newAutoPlay);
  }

  return (
    <>
      <Stack
        direction="row"
        maxWidth={"1200px"}
        mx={"auto"}
        marginTop={0}
        marginBottom={2}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={6}>
            <Typography gutterBottom variant="h3" component="h1">
              Get{" "}
              <Box component="span" fontWeight="medium" color="secondary.light">
                creative{" "}
              </Box>
              lesson plans
            </Typography>
            <Typography variant="h5" component="p" mb={3}>
              Spend less time lesson planning and more time with friends.
              Download
              <Box component="span" fontWeight="bold" color="secondary.main">
                {" "}
                60 free lessons{" "}
              </Box>
              now.
            </Typography>
            <Button variant={"contained"} size="large">
              Download
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Image
              alt={"A beach with palm trees"}
              src={
                "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg"
              }
              width={600}
              height={550}
              priority
              style={{
                maxWidth: "100%",
                height: "auto",
                //   height: "400px",
                //   width: "auto",
                objectFit: "cover",
                borderRadius: 32,
              }}
            />
          </Grid>
        </Grid>
      </Stack>
      <Button
        size="small"
        onClick={handleToggleEnableAutoPlay}
        variant="contained"
        sx={{
          color: "white",
        }}>
        Toggle Enable Autoplay
      </Button>
      <Button
        size="small"
        onClick={handleToggleAutoPlayDirection}
        variant="contained"
        sx={{
          color: "white",
        }}>
        Toggle Direction
      </Button>
      <Button
        size="small"
        onClick={handleIncreaseAutoPlayDelay}
        variant="contained"
        sx={{
          color: "white",
        }}>
        Increase delay
      </Button>
      <Carousel autoPlay={autoPlay} transitions={transitions} />
    </>
  );
}
