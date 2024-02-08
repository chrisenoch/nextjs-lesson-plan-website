"use client";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
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
import Image from "next/image";
import {
  ResponsiveTypographyVariants,
  getTypographyVariantSX,
} from "./ThemeRegistry/responsive-typography-sx";

export default function Hero() {
  const theme = useTheme();

  const title: ResponsiveTypographyVariants = {
    xs: "h4",
    "630c": "h3",
    lg: "h2",
  };
  const titleSX = getTypographyVariantSX(title, theme);

  const titleText: ResponsiveTypographyVariants = {
    xs: "body1",
    "630c": "h6",
  };
  const { fontWeight: doNotUse, ...titleTextSX } = getTypographyVariantSX(
    titleText,
    theme
  );

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
        key: 1,
        element: (
          <Image
            key={1}
            alt="Woman relaxing on hammock"
            src={"/images/woman-on-hammock-2400-1600.jpg"}
            priority
            width={2400}
            height={1600}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ),
      },
      {
        key: 2,
        element: (
          <Image
            alt="Backpackers with a mountain in the background"
            src={"/images/backpackers-by-mountain-2400-1600.jpg"}
            width={2400}
            height={1600}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ),
      },
      {
        key: 3,
        element: (
          <Image
            alt="Four women drinking and smilingk"
            src={"/images/four-women-with-drinks-2400-1709.jpg"}
            width={2400}
            height={1709}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ),
      },
      {
        key: 4,
        element: (
          <Image
            alt="Man in the sea reading a book"
            src={"/images/man-in-water-reading-book-2400-1600.jpg"}
            width={2400}
            height={1600}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ),
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
              <Typography
                gutterBottom
                variant={"h2"}
                sx={titleSX}
                component="h1">
                {/* <Typography gutterBottom variant={titleVariant} component="h1"> */}
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
                variant={"h6"}
                sx={titleTextSX}
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
                itemDisplayBox: {
                  borderRadius: 4,
                },
              }}
              itemDisplayWidth={100}
              itemDisplayHeight={50}
              itemDisplayWidthUnit={"%"}
              itemDisplayHeightUnit={"vh"}
              autoPlay={autoPlay}
              transitions={transitions}
              items={images}
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
