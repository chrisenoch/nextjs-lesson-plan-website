"use client";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Carousel } from "./Carousel/Carousel";
import { useMemo, useState } from "react";
import { AutoPlay, Transitions } from "@/models/types/Carousel/AutoPlay";
import { carouselStore } from "@/services/my-custom-event-emitter/SubscriberConfigObjectStore";
import {
  SubscriberConfigObject,
  emit,
} from "@/services/my-custom-event-emitter/SubscriberService";
import ColorFactory from "./Utils/ColorFactory";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

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

  const [autoPlay] = useState<AutoPlay>({
    enableAutoPlay: false,
    direction: "RIGHT",
    delay: 4500,
  });

  const transitions: Transitions = {
    durationMs: 1500,
    easingFunction: "ease-out",
  };

  const images = useMemo(
    () => [
      {
        alt: "Woman relaxing on hammock",
        imagePath: "/images/woman-on-hammock-2400-1600.jpg",
        renderedWidth: 2400,
        renderedHeight: 1600,
      },
      {
        alt: "Backpackers with a mountain in the background",
        imagePath: "/images/backpackers-by-mountain-2400-1600.jpg",
        renderedWidth: 2400,
        renderedHeight: 1600,
      },
      {
        alt: "Four women drinking and smiling",
        imagePath: "/images/four-women-with-drinks-2400-1709.jpg",
        renderedWidth: 2400,
        renderedHeight: 1709,
      },
      {
        alt: "Man in the sea reading a book",
        imagePath: "/images/man-in-water-reading-book-2400-1600.jpg",
        renderedWidth: 2400,
        renderedHeight: 1600,
      },
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
          height="50vh"
          gap={4}
          flexWrap={"nowrap"}>
          <Grid
            item
            xs={6}
            height="100%"
            display={"flex"}
            alignItems={"center"}>
            <Stack alignItems={"start"}>
              <Typography gutterBottom variant="h2" component="h1">
                Get{" "}
                <Box
                  component="span"
                  fontWeight="medium"
                  color="secondary.light">
                  fun{" "}
                </Box>
                and{" "}
                <Box
                  component="span"
                  fontWeight="medium"
                  color="secondary.light">
                  creative{" "}
                </Box>
                lesson plans
              </Typography>
              <Typography
                variant="h6"
                fontWeight={"regular"}
                component="p"
                mb={3}>
                Spend less time lesson planning and more time making money or
                doing the things you love.{" "}
              </Typography>
              <Button
                download="Free lesson plans"
                href={"http://localhost:3000/lessonplans/free-lesson-plans.txt"}
                component="a"
                variant={"contained"}
                size="large">
                Get 60 free lesson plans
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
              imageDisplayWidth={30}
              imageDisplayHeight={50}
              imageDisplayWidthUnit={"vw"}
              imageDisplayHeightUnit={"vh"}
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
