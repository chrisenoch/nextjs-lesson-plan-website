"use client";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Carousel } from "../carousel-c/Carousel";
import { useMemo, useState } from "react";
import { AutoPlay, Transitions } from "@/models/types/Carousel/AutoPlay";
import { carouselStore } from "@/services/my-custom-event-emitter/SubscriberConfigObjectStore";
import {
  SubscriberConfigObject,
  emit,
} from "@/services/my-custom-event-emitter/SubscriberService";
import ColorFactory from "../presentation-c/ColorFactory";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Image from "next/image";
import {
  MediaQueryByTypographyVariant,
  getTypographyVariantSX,
} from "../theme-registry-c/responsive-typography-sx";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { grey } from "@mui/material/colors";
import womanOnHammock from "../../../public/images/woman-on-hammock-2400-1600.jpg";
import backpackers from "../../../public/images/backpackers-by-mountain-2400-1600.jpg";
import fourWomenWithDrinks from "../../../public/images/four-women-with-drinks-2400-1709.jpg";
import manInWaterReadingBook from "../../../public/images/man-in-water-reading-book-2400-1600.jpg";

export default function Hero() {
  const theme = useTheme();

  const title: MediaQueryByTypographyVariant = {
    xs: "h4",
    "430c": "h3",
    lg: "h2",
  };
  const titleSX = getTypographyVariantSX(title, theme);

  const titleText: MediaQueryByTypographyVariant = {
    xs: "body2",
    "430c": "body1",
    sm: "body18",
    md: "h6",
  };
  const { fontWeight: doNotUse, ...titleTextSX } = getTypographyVariantSX(
    titleText,
    theme
  );

  //This is my alternative to using useContext. I think it works very well for activating callbacks in response to events.
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

  // Assign to the store, so we can control the carousel from any component tree.
  // E.g. In another component, we could do:
  // 1. const carouselMoveLeft = carouselStore.get("moveLeft");
  // 2. onClick={() => emit(carouselMoveLeft)}
  carouselStore.set("moveLeft", carouselMoveLeft);
  carouselStore.set("moveRight", carouselMoveRight);
  const [autoPlay, setAutoPlay] = useState<AutoPlay>({
    enableAutoPlay: false,
    direction: "RIGHT",
    delay: 5500,
  });

  const [areControlsVisible, setAreControlsVisible] = useState<boolean>(false);

  const transitions: Transitions = {
    durationMs: 1500,
    easingFunction: "ease-out",
  };

  function toggleAutoPlayDirection() {
    setAutoPlay({
      ...autoPlay,
      direction: autoPlay.direction === "RIGHT" ? "LEFT" : "RIGHT",
    });
  }

  const images = useMemo(
    () => [
      {
        key: 1,
        element: (
          <Image
            placeholder="blur"
            alt="Woman relaxing on hammock"
            src={womanOnHammock}
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
            placeholder="blur"
            alt="Backpackers with a mountain in the background"
            src={backpackers}
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
            placeholder="blur"
            alt="Four women drinking and smilingk"
            src={fourWomenWithDrinks}
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
            placeholder="blur"
            alt="Man in the sea reading a book"
            src={manInWaterReadingBook}
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
          gap={4}
          sx={{
            flexWrap: { xs: "wrap", "630c": "nowrap" },
          }}
          flexWrap={"wrap"}>
          <Grid item display={"flex"} alignItems={"center"} width={"100%"}>
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
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/lessonplans/free-lesson-plans.txt`}
                component="a"
                variant={"contained"}
                size="large"
                sx={{
                  fontSize: {
                    xs: "0.8125rem",
                    sm: "0.875rem",
                    md: "0.9375rem",
                  },
                  padding: {
                    xs: "4px 10px",
                    sm: "6px 16px",
                    md: "8px 22px",
                  },
                }}>
                Get 60 free lesson plans
              </Button>
            </Stack>
          </Grid>

          <Grid
            item
            width={"100%"}
            minWidth={"40%"}
            //height="450px"

            sx={{
              height: {
                xs: "200px",
                "430c": "270px",
                "630c": "400px",
                md: "450px",
              },
            }}>
            <Image
              placeholder="blur"
              alt="Woman relaxing on hammock"
              src={womanOnHammock}
              priority
              width={2400}
              height={1600}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
