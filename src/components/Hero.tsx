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
  MediaQueryByTypographyVariant,
  getTypographyVariantSX,
} from "./ThemeRegistry/responsive-typography-sx";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { grey } from "@mui/material/colors";

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
    enableAutoPlay: true,
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
                href={"http://localhost:3000/lessonplans/free-lesson-plans.txt"}
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
            <Carousel
              styles={{
                itemDisplayBox: {
                  borderRadius: 4,
                },
              }}
              itemDisplayWidth={100}
              itemDisplayHeight={100}
              itemDisplayWidthUnit={"%"}
              itemDisplayHeightUnit={"%"}
              autoPlay={autoPlay}
              transitions={transitions}
              items={images}
              carouselMoveLeft={carouselMoveLeft}
              carouselMoveRight={carouselMoveRight}>
              <>
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
                    <IconButton
                      size="large"
                      color="primary"
                      onClick={() => emit(carouselMoveRight)}>
                      <ArrowForwardIos />
                    </IconButton>
                  </ColorFactory>
                  {/* <ColorFactory primary="#FFFFFF">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => emit(carouselMoveRight)}>
                      <ArrowForwardIos />
                    </IconButton>
                  </ColorFactory> */}
                </Stack>
                <Stack
                  direction={"row"}
                  sx={{
                    position: "absolute",
                    justifyContent: "space-between",
                    width: "100%",
                    bottom: "8px",
                    paddingX: 1,
                  }}>
                  <Stack direction={"row"}>
                    <Box
                      sx={{
                        padding: 0,
                        borderRadius: "9999px",
                        minWidth: { xs: "30px", md: "40px" },
                        minHeight: { xs: "30px", md: "40px" },
                        visibility: "hidden",
                      }}></Box>
                  </Stack>
                  <Stack
                    direction={"row"}
                    gap={1}
                    sx={{
                      transform: areControlsVisible
                        ? "translateY(0px)"
                        : "translateY(50px)",
                      transition: "500ms transform ease-out",
                    }}>
                    <ColorFactory primary={grey[400]}>
                      <Button
                        variant="contained"
                        onClick={toggleAutoPlayDirection}
                        sx={{
                          padding: 0,
                          borderRadius: "9999px",
                          minWidth: { xs: "30px", md: "40px" },
                          minHeight: { xs: "30px", md: "40px" },
                        }}>
                        <CompareArrowsIcon />
                      </Button>
                      {!autoPlay.enableAutoPlay && (
                        <Button
                          variant="contained"
                          onClick={() =>
                            setAutoPlay({
                              ...autoPlay,
                              enableAutoPlay: true,
                            })
                          }
                          sx={{
                            padding: 0,
                            borderRadius: "9999px",
                            minWidth: { xs: "30px", md: "40px" },
                            minHeight: { xs: "30px", md: "40px" },
                          }}>
                          <PlayArrowIcon />
                        </Button>
                      )}
                      {autoPlay.enableAutoPlay && (
                        <Button
                          variant="contained"
                          onClick={() =>
                            setAutoPlay({
                              ...autoPlay,
                              enableAutoPlay: false,
                            })
                          }
                          sx={{
                            padding: 0,
                            borderRadius: "9999px",
                            minWidth: { xs: "30px", md: "40px" },
                            minHeight: { xs: "30px", md: "40px" },
                          }}>
                          <PauseIcon />
                        </Button>
                      )}
                    </ColorFactory>
                  </Stack>
                  <Stack direction={"row"}>
                    {areControlsVisible && (
                      <ColorFactory primary={grey[400]}>
                        <Button
                          variant="contained"
                          onClick={() => setAreControlsVisible(false)}
                          sx={{
                            padding: 0,
                            borderRadius: "9999px",
                            minWidth: { xs: "30px", md: "40px" },
                            minHeight: { xs: "30px", md: "40px" },
                          }}>
                          <VisibilityOffIcon />
                        </Button>
                      </ColorFactory>
                    )}
                    {!areControlsVisible && (
                      <ColorFactory primary={grey[400]}>
                        <Button
                          variant="contained"
                          onClick={() => setAreControlsVisible(true)}
                          sx={{
                            padding: 0,
                            borderRadius: "9999px",
                            minWidth: { xs: "30px", md: "40px" },
                            minHeight: { xs: "30px", md: "40px" },
                          }}>
                          <VisibilityIcon />
                        </Button>
                      </ColorFactory>
                    )}
                  </Stack>
                </Stack>
              </>
            </Carousel>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
