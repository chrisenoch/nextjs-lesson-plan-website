"use client";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  duration,
} from "@mui/material";
import Image from "next/image";
import { Carousel } from "./Carousel/Carousel";
import { useMemo, useRef, useState } from "react";
import {
  AutoPlay,
  AutoPlayDirection,
  Transitions,
} from "@/models/types/AutoPlay";
import { carouselStore } from "@/services/my-custom-event-emitter/SubscriberConfigObjectStore";
import {
  SubscriberConfigObject,
  emit,
} from "@/services/my-custom-event-emitter/SubscriberService";
import { useIsFirstRender } from "@/customHooks/useIsFirstRender";
import ColorFactory from "./ColorFactory";
import {
  ArrowBackIos,
  ArrowForward,
  ArrowForwardIos,
} from "@mui/icons-material";

export default function Hero() {
  //const isFirstRender = useIsFirstRender();
  const carouselMoveLeft: SubscriberConfigObject = useMemo(() => {
    return {
      subscribers: new Set(),
    };
  }, []);

  const carouselMoveRight: SubscriberConfigObject = useMemo(() => {
    return {
      subscribers: new Set(),
    };
  }, []);

  carouselStore.set("moveLeft", carouselMoveLeft);
  carouselStore.set("moveRight", carouselMoveRight);

  const [autoPlay, setAutoPlay] = useState<AutoPlay>({
    enableAutoPlay: true,
    direction: "LEFT",
    delay: 2000,
  });

  const transitions: Transitions = {
    durationMs: 1000,
    easingFunction: "ease-out",
  };

  const images = useMemo(
    () => [
      // {
      //   alt: "Giraffes",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/giraffes_south_africa.jpg",
      // },

      // {
      //   alt: "Fortress",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/Narilka%20fortress%20Tbilisi.jpg",
      // },
      // {
      //   alt: "Virgin",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/virgin_cruises.jpg",
      // },

      // {
      //   alt: "Antalya",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/antalya-shutterstock.jpg",
      // },
      // {
      //   alt: "Fuerteventura",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/fuerteventura-shutterstock.jpg",
      // },
      {
        alt: "Beach-1",
        imagePath:
          "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
      },
      {
        alt: "Driverless-1",
        imagePath:
          "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
      },
      {
        alt: "Shopping-1",
        imagePath:
          "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
      },
      // {
      //   alt: "Beach-2",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
      // },
      // {
      //   alt: "Driverless cars-2",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
      // },
      // {
      //   alt: "Shopping-2",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
      // },
      // {
      //   alt: "Beach-3",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
      // },
      // {
      //   alt: "Driverless cars-3",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
      // },
      // {
      //   alt: "Shopping-3",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
      // },
      // {
      //   alt: "Beach-4",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
      // },
      // {
      //   alt: "Driverless cars-4",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
      // },
      // {
      //   alt: "Shopping-4",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
      // },
      // {
      //   alt: "Beach-5",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
      // },
      // {
      //   alt: "Driverless cars-5",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
      // },
      // {
      //   alt: "Shopping-5",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
      // },
      // {
      //   alt: "Beach-6",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
      // },
      // {
      //   alt: "Driverless cars-6",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
      // },
      // {
      //   alt: "Shopping-6",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
      // },
      // {
      //   alt: "Beach-7",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
      // },
      // {
      //   alt: "Driverless cars-7",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
      // },
      // {
      //   alt: "Shopping-7",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
      // },
      // {
      //   alt: "Beach-8",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
      // },
      // {
      //   alt: "Driverless cars-8",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
      // },
      // {
      //   alt: "Shopping-8",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
      // },
      // {
      //   alt: "Beach-9",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
      // },
      // {
      //   alt: "Driverless cars-9",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
      // },
      // {
      //   alt: "Shopping-9",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
      // },
    ],
    []
  );

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
      <Button
        size="small"
        onClick={() => emit(carouselMoveLeft)}
        variant="contained"
        sx={{
          color: "white",
        }}>
        Emit move left to carousel
      </Button>
      <Button
        size="small"
        onClick={() => emit(carouselMoveRight)}
        variant="contained"
        sx={{
          color: "white",
        }}>
        Emit move right to carousel
      </Button>
      <Carousel
        autoPlay={autoPlay}
        transitions={transitions}
        images={images}
        carouselMoveLeft={carouselMoveLeft}
        carouselMoveRight={carouselMoveRight}>
        <Stack
          marginTop={1}
          direction={"row"}
          sx={{
            position: "absolute",
            transform: "translatex(-50%)",
            left: "50%",
            bottom: "0px",
          }}>
          <ColorFactory primary="#FFFFFF">
            <IconButton color="primary" onClick={() => emit(carouselMoveLeft)}>
              <ArrowBackIos />
            </IconButton>
          </ColorFactory>
          <ColorFactory primary="#FFFFFF">
            <IconButton color="primary" onClick={() => emit(carouselMoveRight)}>
              <ArrowForwardIos />
            </IconButton>
          </ColorFactory>
        </Stack>{" "}
      </Carousel>
    </>
  );
}
