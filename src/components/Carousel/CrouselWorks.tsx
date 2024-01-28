"use client";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import useTriggerRerender from "@/customHooks/useTriggerRerender";
import {
  AutoPlay,
  AutoPlayDirection,
  Transitions,
} from "@/models/types/Carousel/AutoPlay";
import {
  SubscriberConfigObject,
  subscribe,
  unsubscribe,
} from "@/services/my-custom-event-emitter/SubscriberService";

//Transition duration must be less than autoplayDelay
export function CarouselWorks({
  images: unPreparedImages,
  renderedImageWidth,
  renderedImageHeight,
  autoPlay,
  transitions,
  carouselMoveLeft,
  carouselMoveRight,
  children,
}: {
  renderedImageWidth: number;
  renderedImageHeight: number;
  autoPlay?: AutoPlay;
  transitions?: Transitions;
  images: { alt: string; imagePath: string }[];
  carouselMoveLeft: SubscriberConfigObject;
  carouselMoveRight: SubscriberConfigObject;
  children: React.ReactNode;
}) {
  //const images = increaseArrayIfTooSmall(unPreparedImages);
  const images = unPreparedImages;
  const DEFAULT_TRANSITION_DURATION = 1000;
  const IMG_WIDTH = 200;
  const TOTAL_IMGS = images.length;
  const MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG = TOTAL_IMGS * IMG_WIDTH - IMG_WIDTH;
  const RESTART_AUTOPLAY_DELAY = autoPlay?.restartDelayAfterLastUserInteraction
    ? autoPlay?.restartDelayAfterLastUserInteraction
    : 3000;
  let maxImageRowRight: number;
  const isOdd = TOTAL_IMGS % 2 === 0 ? false : true;
  if (isOdd) {
    maxImageRowRight = Math.floor(TOTAL_IMGS / 2) * IMG_WIDTH;
  } else {
    maxImageRowRight = (TOTAL_IMGS / 2) * IMG_WIDTH;
  }
  const LEFT_ODD_IMAGES_TO_MOVE = Math.floor(TOTAL_IMGS / 2);
  const LEFT_EVEN_IMAGES_TO_MOVE = Math.floor(TOTAL_IMGS / 2) - 1;
  const RIGHT_ODD_IMAGES_TO_MOVE = Math.floor(TOTAL_IMGS / 2) * -1;
  const RIGHT_EVEN_IMAGES_TO_MOVE = (TOTAL_IMGS / 2) * -1;
  const [isOverFlowShown, setIsOverflowShown] = useState<boolean>(false);
  const [imagesOne, setImagesOne] =
    useState<{ alt: string; imagePath: string }[]>(images);
  const [imagesTwo, setImagesTwo] =
    useState<{ alt: string; imagePath: string }[]>(images);
  const [imageOneRowRight, setImageOneRowRight] =
    useState<number>(maxImageRowRight);
  const [imageTwoRowRight, setImageTwoRowRight] =
    useState<number>(maxImageRowRight);
  const [activeImageRow, setActiveImageRow] = useState<1 | 2>(1);
  const disableControls = useRef<boolean>(false);
  const autoPlayIntervalIds = useRef<ReturnType<typeof setInterval>[]>([]);
  const restartAutoPlayUponIdleTimeoutId = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const isFirstRender = useRef(true);
  const hasAutoPlayInit = useRef(false);
  const { triggerRerender } = useTriggerRerender();
  const [previousAutoPlay, setPreviousAutoPlay] = useState<
    AutoPlay | undefined
  >(autoPlay);

  checkForPropsErrors();
  const updateImagesOne = useCallback(() => {
    console.log("Transition ended imageOneRow");
    console.log("starting updateImagesOne");
    //Move images left
    if (imageOneRowRight === MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG) {
      let newImagesRowTwo = imagesTwo.slice();
      //move first entry to end
      const firstImgsRowTwo = isOdd
        ? newImagesRowTwo.slice(0, LEFT_ODD_IMAGES_TO_MOVE)
        : newImagesRowTwo.slice(0, LEFT_EVEN_IMAGES_TO_MOVE);
      newImagesRowTwo.push(...firstImgsRowTwo);
      newImagesRowTwo = isOdd
        ? newImagesRowTwo.slice(LEFT_ODD_IMAGES_TO_MOVE)
        : newImagesRowTwo.slice(LEFT_EVEN_IMAGES_TO_MOVE);

      setImagesTwo(newImagesRowTwo);
      setImageTwoRowRight(maxImageRowRight);
      setActiveImageRow(2);

      //Above needs to be completed before the below runs
      setImageOneRowRight(maxImageRowRight);
      let newImagesRowOne = imagesOne.slice();
      //move first entry to end
      const firstImgsRowOne = isOdd
        ? newImagesRowOne.slice(0, LEFT_ODD_IMAGES_TO_MOVE)
        : newImagesRowOne.slice(0, LEFT_EVEN_IMAGES_TO_MOVE);
      newImagesRowOne.push(...firstImgsRowOne);
      newImagesRowOne = isOdd
        ? newImagesRowOne.slice(LEFT_ODD_IMAGES_TO_MOVE)
        : newImagesRowOne.slice(LEFT_EVEN_IMAGES_TO_MOVE);
      setImagesOne(newImagesRowOne);
    }

    //Move images right
    if (imageOneRowRight === 0) {
      let newImagesRowTwo = imagesTwo.slice();

      //remove the last entry and add it to the start
      const lastImgsRowTwo = isOdd
        ? newImagesRowTwo.slice(RIGHT_ODD_IMAGES_TO_MOVE)
        : newImagesRowTwo.slice(RIGHT_EVEN_IMAGES_TO_MOVE);
      newImagesRowTwo.unshift(...lastImgsRowTwo);
      newImagesRowTwo = isOdd
        ? newImagesRowTwo.slice(0, RIGHT_ODD_IMAGES_TO_MOVE)
        : newImagesRowTwo.slice(0, RIGHT_EVEN_IMAGES_TO_MOVE);

      setImagesTwo(newImagesRowTwo);
      setImageTwoRowRight(maxImageRowRight);
      setActiveImageRow(2);

      //Above needs to be completed before the below runs
      setImageOneRowRight(maxImageRowRight);
      let newImagesRowOne = imagesOne.slice();
      //remove the last entry and add it to the start
      const lastImgsRowOne = isOdd
        ? newImagesRowOne.slice(RIGHT_ODD_IMAGES_TO_MOVE)
        : newImagesRowOne.slice(RIGHT_EVEN_IMAGES_TO_MOVE);
      newImagesRowOne.unshift(...lastImgsRowOne);
      newImagesRowOne = isOdd
        ? newImagesRowOne.slice(0, RIGHT_ODD_IMAGES_TO_MOVE)
        : newImagesRowOne.slice(0, RIGHT_EVEN_IMAGES_TO_MOVE);
      setImagesOne(newImagesRowOne);
    }
    console.log("finished updateImagesOne");
  }, [
    LEFT_EVEN_IMAGES_TO_MOVE,
    LEFT_ODD_IMAGES_TO_MOVE,
    MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG,
    RIGHT_EVEN_IMAGES_TO_MOVE,
    RIGHT_ODD_IMAGES_TO_MOVE,
    imageOneRowRight,
    imagesOne,
    imagesTwo,
    isOdd,
    maxImageRowRight,
  ]);

  const updateImagesTwo = useCallback(() => {
    console.log("starting updateImagesTwo");
    console.log("Transition ended imageTwoRow");
    //Move images left
    if (imageTwoRowRight === MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG) {
      let newImagesRowOne = imagesOne.slice();
      //move first entry to end
      const firstImgsRowOne = isOdd
        ? newImagesRowOne.slice(0, LEFT_ODD_IMAGES_TO_MOVE)
        : newImagesRowOne.slice(0, LEFT_EVEN_IMAGES_TO_MOVE);
      newImagesRowOne.push(...firstImgsRowOne);
      newImagesRowOne = isOdd
        ? newImagesRowOne.slice(LEFT_ODD_IMAGES_TO_MOVE)
        : newImagesRowOne.slice(LEFT_EVEN_IMAGES_TO_MOVE);
      setImagesOne(newImagesRowOne);
      setImageOneRowRight(maxImageRowRight);
      setActiveImageRow(1);

      //Above needs to be completed before the below runs
      setImageTwoRowRight(maxImageRowRight);
      let newImagesRowTwo = imagesTwo.slice();
      //move first entry to end
      const firstImgsRowTwo = isOdd
        ? newImagesRowTwo.slice(0, LEFT_ODD_IMAGES_TO_MOVE)
        : newImagesRowTwo.slice(0, LEFT_EVEN_IMAGES_TO_MOVE);
      newImagesRowTwo.push(...firstImgsRowTwo);
      newImagesRowTwo = isOdd
        ? newImagesRowTwo.slice(LEFT_ODD_IMAGES_TO_MOVE)
        : newImagesRowTwo.slice(LEFT_EVEN_IMAGES_TO_MOVE);
      setImagesTwo(newImagesRowTwo);
    }

    //Move images right
    if (imageTwoRowRight === 0) {
      let newImagesRowOne = imagesOne.slice();
      //remove the last entry and add it to the start
      const lastImgsRowOne = isOdd
        ? newImagesRowOne.slice(RIGHT_ODD_IMAGES_TO_MOVE)
        : newImagesRowOne.slice(RIGHT_EVEN_IMAGES_TO_MOVE);
      newImagesRowOne.unshift(...lastImgsRowOne);
      newImagesRowOne = isOdd
        ? newImagesRowOne.slice(0, RIGHT_ODD_IMAGES_TO_MOVE)
        : newImagesRowOne.slice(0, RIGHT_EVEN_IMAGES_TO_MOVE);

      setImagesOne(newImagesRowOne);
      setImageOneRowRight(maxImageRowRight);
      setActiveImageRow(1);

      //Above needs to be completed before the below runs
      setImageTwoRowRight(maxImageRowRight);
      let newImagesRowTwo = imagesTwo.slice();
      //remove the last entry and add it to the start
      const lastImgsRowTwo = isOdd
        ? newImagesRowTwo.slice(RIGHT_ODD_IMAGES_TO_MOVE)
        : newImagesRowTwo.slice(RIGHT_EVEN_IMAGES_TO_MOVE);
      newImagesRowTwo.unshift(...lastImgsRowTwo);
      newImagesRowTwo = isOdd
        ? newImagesRowTwo.slice(0, RIGHT_ODD_IMAGES_TO_MOVE)
        : newImagesRowTwo.slice(0, RIGHT_EVEN_IMAGES_TO_MOVE);
      setImagesTwo(newImagesRowTwo);
    }
    console.log("finished updateImagesTwo");
  }, [
    LEFT_EVEN_IMAGES_TO_MOVE,
    LEFT_ODD_IMAGES_TO_MOVE,
    MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG,
    RIGHT_EVEN_IMAGES_TO_MOVE,
    RIGHT_ODD_IMAGES_TO_MOVE,
    imageTwoRowRight,
    imagesOne,
    imagesTwo,
    isOdd,
    maxImageRowRight,
  ]);

  const moveRightWithAutoPlay = useCallback(() => {
    if (!disableControls.current && images.length > 1) {
      setImageOneRowRight((px) => px - 200);
      setImageTwoRowRight((px) => px - 200);
    }
  }, [images.length]);

  const moveLeftWithAutoPlay = useCallback(() => {
    if (!disableControls.current && images.length > 1) {
      setImageOneRowRight((px) => px + 200);
      setImageTwoRowRight((px) => px + 200);
    }
  }, [images.length]);

  const startAutoPlay = useCallback(
    (delay: number, direction: AutoPlayDirection) => {
      direction === "RIGHT" ? moveRightWithAutoPlay() : moveLeftWithAutoPlay();

      const intervalId = setInterval(() => {
        if (direction === "RIGHT") {
          moveRightWithAutoPlay();
        }
        if (direction === "LEFT") {
          moveLeftWithAutoPlay();
        }
      }, delay);

      autoPlayIntervalIds.current.push(intervalId);
      console.log(
        "number of interval ids " + autoPlayIntervalIds.current.length
      );
    },
    [moveLeftWithAutoPlay, moveRightWithAutoPlay]
  );

  if (
    !isFirstRender.current &&
    !hasAutoPlayInit.current &&
    autoPlay &&
    autoPlay.enableAutoPlay
  ) {
    startAutoPlay(autoPlay.delay, autoPlay.direction);
    hasAutoPlayInit.current = true;
  }

  if (previousAutoPlay !== autoPlay) {
    stopAutoPlay();
    if (autoPlay) {
      if (autoPlay.enableAutoPlay) {
        startAutoPlay(autoPlay.delay, autoPlay.direction);
      } else {
        stopAutoPlay();
      }
    }
    setPreviousAutoPlay(autoPlay);
  }

  const deactivateControls = useCallback(() => {
    disableControls.current = true;
  }, []);

  const activateControls = useCallback(() => {
    disableControls.current = false;
  }, []);

  const restartAutoPlayUponIdle = useCallback(
    (delay: number) => {
      if (autoPlay) {
        restartAutoPlayUponIdleTimeoutId.current &&
          clearTimeout(restartAutoPlayUponIdleTimeoutId.current);
        restartAutoPlayUponIdleTimeoutId.current = setTimeout(() => {
          startAutoPlay(autoPlay.delay, autoPlay.direction);
        }, delay);
      }
    },
    [autoPlay, startAutoPlay]
  );

  function stopAutoPlay() {
    autoPlayIntervalIds.current.forEach((intervalId) =>
      clearInterval(intervalId)
    );
    autoPlayIntervalIds.current = [];
  }

  useEffect(() => {
    if (images.length > 1) {
      const imageRowEle = document.querySelector("#image-row-1");
      imageRowEle &&
        imageRowEle.addEventListener("transitionend", updateImagesOne);
      imageRowEle &&
        imageRowEle.addEventListener("transitionend", activateControls);

      imageRowEle &&
        imageRowEle.addEventListener("transitionstart", deactivateControls);

      return () => {
        imageRowEle?.removeEventListener("transitionend", updateImagesOne);
        imageRowEle?.removeEventListener("transitionend", activateControls);
        imageRowEle?.removeEventListener("transitionstart", deactivateControls);
      };
    }
  }, [
    MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG,
    activateControls,
    deactivateControls,
    imageOneRowRight,
    images.length,
    imagesOne,
    imagesTwo,
    isOdd,
    maxImageRowRight,
    updateImagesOne,
  ]);

  useEffect(() => {
    if (images.length > 1) {
      const imageRowEle = document.querySelector("#image-row-2");
      imageRowEle &&
        imageRowEle.addEventListener("transitionend", updateImagesTwo);
      imageRowEle &&
        imageRowEle.addEventListener("transitionend", activateControls);

      imageRowEle &&
        imageRowEle.addEventListener("transitionstart", deactivateControls);

      return () => {
        imageRowEle?.removeEventListener("transitionend", updateImagesTwo);
        imageRowEle?.removeEventListener("transitionend", activateControls);
        imageRowEle?.removeEventListener("transitionstart", deactivateControls);
      };
    }
  }, [
    MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG,
    activateControls,
    deactivateControls,
    imageTwoRowRight,
    images.length,
    imagesOne,
    imagesTwo,
    isOdd,
    maxImageRowRight,
    updateImagesTwo,
  ]);

  const renderedImagesOne = useMemo(
    () =>
      imagesOne.map((image, index) => {
        return (
          <Image
            key={image.alt + "-1-" + index + 1}
            alt={image.alt}
            src={image.imagePath}
            width={renderedImageWidth}
            height={renderedImageHeight}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            priority={true}
          />
        );
      }),
    [imagesOne, renderedImageHeight, renderedImageWidth]
  );

  const renderedImagesTwo = useMemo(
    () =>
      imagesTwo.map((image, index) => {
        return (
          <Image
            key={image.alt + "-2-" + index + 1}
            alt={image.alt}
            src={image.imagePath}
            width={renderedImageWidth}
            height={renderedImageHeight}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        );
      }),
    [imagesTwo, renderedImageHeight, renderedImageWidth]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      triggerRerender();
    }
  }, [triggerRerender]);

  function checkForPropsErrors() {
    if (transitions && autoPlay && autoPlay.delay < transitions.durationMs) {
      console.warn(
        "Error: AutoPlay delay must be greater than transition duration."
      );
    }
    if (
      autoPlay &&
      autoPlay.restartDelayAfterLastUserInteraction &&
      autoPlay.restartDelayAfterLastUserInteraction < 1000
    ) {
      console.warn(
        "Setting restartDelayAfterLastUserInteraction# to less than 1000ms is likely to make it difficult" +
          " for the user to interact with the carousel. An example of interacting with the carousel is the user pressing the left or right buttons."
      );
    }
  }

  const moveLeftSubscription = useMemo(() => {
    function moveLeftManualControls() {
      console.log("in moveLeftManualControls");
      stopAutoPlay();
      if (!disableControls.current && images.length > 1) {
        restartAutoPlayUponIdle(RESTART_AUTOPLAY_DELAY);
        setImageOneRowRight((px) => px + 200);
        setImageTwoRowRight((px) => px + 200);
      }
    }
    return {
      subscribe: moveLeftManualControls,
    };
  }, [RESTART_AUTOPLAY_DELAY, images.length, restartAutoPlayUponIdle]);
  const moveRightSubscription = useMemo(() => {
    function moveRightManualControls() {
      console.log("in moveRightManualControls");
      stopAutoPlay();
      if (!disableControls.current && images.length > 1) {
        restartAutoPlayUponIdle(RESTART_AUTOPLAY_DELAY);
        setImageOneRowRight((px) => px - 200);
        setImageTwoRowRight((px) => px - 200);
      }
    }
    return {
      subscribe: moveRightManualControls,
    };
  }, [RESTART_AUTOPLAY_DELAY, images.length, restartAutoPlayUponIdle]);

  useEffect(() => {
    carouselMoveLeft && subscribe(carouselMoveLeft, moveLeftSubscription);
    carouselMoveRight && subscribe(carouselMoveRight, moveRightSubscription);
    return () => {
      carouselMoveLeft && unsubscribe(carouselMoveLeft, moveLeftSubscription);
      carouselMoveRight &&
        unsubscribe(carouselMoveRight, moveRightSubscription);
    };
  }, [
    carouselMoveLeft,
    carouselMoveRight,
    moveLeftSubscription,
    moveRightSubscription,
  ]);

  return (
    <>
      <Stack>
        <Box
          id="image-display-box"
          width="200px"
          height="200px"
          overflow={isOverFlowShown ? "visible" : "hidden"}
          marginLeft="500px"
          position="relative">
          <Stack
            direction="row"
            id="image-row-1"
            sx={{
              width: "200px",
              display: `${activeImageRow === 1 ? "flex" : "none"}`,
              height: "200px",
              backgroundColor: "gray",
              transition: `right ${
                transitions
                  ? transitions.durationMs + "ms"
                  : DEFAULT_TRANSITION_DURATION + "ms"
              } ${transitions ? transitions.easingFunction : "ease-out"} `,
              position: "absolute",
              right: `${imageOneRowRight}px`,
            }}>
            {renderedImagesOne}
          </Stack>
          <Stack
            direction="row"
            id="image-row-2"
            sx={{
              width: "200px",
              display: `${activeImageRow === 2 ? "flex" : "none"}`,
              height: "200px",
              backgroundColor: "gray",
              transition: `right ${
                transitions
                  ? transitions.durationMs + "ms"
                  : DEFAULT_TRANSITION_DURATION + "ms"
              } ${transitions ? transitions.easingFunction : "ease-out"} `,
              position: "absolute",
              right: `${imageTwoRowRight}px`, //decreasing the value 'right' moves the Images from left to right
            }}>
            {renderedImagesTwo}
          </Stack>
          {children}
        </Box>
      </Stack>

      <Stack marginTop={8} direction={"row"}>
        <Button
          onClick={() => {
            if (autoPlay) {
              startAutoPlay(autoPlay.delay, autoPlay.direction);
            }
          }}
          variant="outlined">
          Start Autoplay
        </Button>
        <Button onClick={stopAutoPlay} variant="outlined">
          Stop Autoplay
        </Button>
        <Button onClick={triggerRerender} variant="outlined">
          Rerender
        </Button>
        <Button
          onClick={() =>
            setIsOverflowShown((isOverFlowHidden) => !isOverFlowHidden)
          }
          color="secondary"
          variant="outlined">
          Toggle overflow
        </Button>
      </Stack>
    </>
  );
}

function increaseArrayIfTooSmall(
  imagesArr: { alt: string; imagePath: string }[]
) {
  let multiplier = 0;
  if (imagesArr.length === 2 || imagesArr.length === 3) {
    multiplier = 3;
  } else if (imagesArr.length === 4) {
    multiplier = 2;
  }
  if (multiplier !== 0) {
    const newImagesArr = [];
    for (let i = 0; i < multiplier; i++) {
      newImagesArr.push(...imagesArr);
    }
    imagesArr = newImagesArr;
  }
  return imagesArr;
}