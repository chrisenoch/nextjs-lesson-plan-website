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
    enableAutoPlay: false,
    direction: "RIGHT",
    delay: 4500,
  });

  const transitions: Transitions = {
    durationMs: 2000,
    easingFunction: "ease-out",
  };

  const images = useMemo(
    () => [
      // {
      //   alt: "Giraffes",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/giraffes_south_africa.jpg",
      // },

      {
        alt: "Fortress",
        imagePath:
          "https://raw.githubusercontent.com/chrisenoch/assets/main/Narilka%20fortress%20Tbilisi.jpg",
      },
      {
        alt: "Virgin",
        imagePath:
          "https://raw.githubusercontent.com/chrisenoch/assets/main/virgin_cruises.jpg",
      },
      {
        alt: "Salad",
        imagePath:
          "https://raw.githubusercontent.com/chrisenoch/assets/main/salad.jpg",
      },
      {
        alt: "Swimming",
        imagePath:
          "https://raw.githubusercontent.com/chrisenoch/assets/main/swimming.jpg",
      },

      {
        alt: "Laptop",
        imagePath:
          "https://raw.githubusercontent.com/chrisenoch/assets/main/laptop.jpg",
      },
      {
        alt: "Beach-1",
        imagePath:
          "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
      },
      // {
      //   alt: "Driverless-1",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
      // },
      // {
      //   alt: "Shopping-1",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
      // },
      // {
      //   alt: "Fuerteventura",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/fuerteventura-shutterstock.jpg",
      // },

      // {
      //   alt: "Antalya",
      //   imagePath:
      //     "https://raw.githubusercontent.com/chrisenoch/assets/main/antalya-shutterstock.jpg",
      // },
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

  return (
    <>
      <Stack
        direction="row"
        maxWidth={"1200px"}
        mx={"auto"}
        marginTop={0}
        marginBottom={2}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          height="50vh">
          <Grid
            item
            xs={6}
            height="100%"
            display={"flex"}
            alignItems={"center"}>
            <Stack alignItems={"start"}>
              <Typography gutterBottom variant="h3" component="h1">
                Get{" "}
                <Box
                  component="span"
                  fontWeight="medium"
                  color="secondary.light">
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
            </Stack>
          </Grid>
          <Grid item xs={6} height="100%">
            <Carousel
              styles={{
                imageDisplayBox: {
                  borderRadius: 4,
                },
              }}
              imageDisplayWidth={40}
              imageDisplayHeight={50}
              imageDisplayWidthUnit={"vw"}
              imageDisplayHeightUnit={"vh"}
              renderedImageWidth={1000}
              renderedImageHeight={1000}
              autoPlay={autoPlay}
              transitions={transitions}
              images={images}
              carouselMoveLeft={carouselMoveLeft}
              carouselMoveRight={carouselMoveRight}>
              <Stack
                direction={"row"}
                sx={{
                  position: "absolute",
                  transform: "translatey(-50%)",
                  justifyContent: "space-between",
                  width: "100%",
                  top: "50%",
                }}>
                <ColorFactory primary="#FFFFFF">
                  <IconButton
                    color="primary"
                    size="large"
                    onClick={() => emit(carouselMoveLeft)}>
                    <ArrowBackIos />
                  </IconButton>
                </ColorFactory>
                <ColorFactory primary="#FFFFFF">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => emit(carouselMoveRight)}>
                    <ArrowForwardIos />
                  </IconButton>
                </ColorFactory>
              </Stack>{" "}
            </Carousel>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
