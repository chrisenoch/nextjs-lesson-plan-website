"use client";
/*
IMPORTANT:
I did this as a challenge to myself without consulting anything online. In a real job I would get an idea of the best ways to do something
before starting a large project. I knew there must have been a better way but i didn't want to see if I could do it.
I will soon change this to use an animation infinite scroll and transform translate.
*/

import { Box, Stack, SxProps, Theme } from "@mui/material";
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
} from "@/services/SubscriberService";
import {
  CarouselItemDisplayBox,
  CarouselItemRow,
} from "@/models/types/Carousel/Styles";

type CarouselElement = { key: any; element: ReactElement };

//Transition duration must be less than autoplayDelay
export function Carousel({
  items: unPreparedItems,
  styles,
  itemDisplayWidth: ITEM_DISPLAY_WIDTH,
  itemDisplayHeight: ITEM_DISPLAY_HEIGHT,
  itemDisplayWidthUnit: ITEM_DISPLAY_WIDTH_UNIT,
  itemDisplayHeightUnit: ITEM_DISPLAY_HEIGHT_UNIT,
  autoPlay,
  transitions,
  carouselMoveLeft,
  carouselMoveRight,
  children,
}: {
  items: CarouselElement[];
  styles?: {
    itemDisplayBox?: CarouselItemDisplayBox;
    itemRow?: CarouselItemRow;
  };
  itemDisplayWidth: number;
  itemDisplayHeight: number;
  itemDisplayWidthUnit: string;
  itemDisplayHeightUnit: string;
  autoPlay?: AutoPlay;
  transitions?: Transitions;
  carouselMoveLeft: SubscriberConfigObject;
  carouselMoveRight: SubscriberConfigObject;
  children: React.ReactNode;
}) {
  const items = increaseArrayIfTooSmall(unPreparedItems);
  const DEFAULT_TRANSITION_DURATION = 1000;
  const TOTAL_ITEMS = items.length;
  const MAX_WIDTH_TO_RIGHT_OF_DISPLAY_ITEM =
    TOTAL_ITEMS * ITEM_DISPLAY_WIDTH - ITEM_DISPLAY_WIDTH;
  const RESTART_AUTOPLAY_DELAY = autoPlay?.restartDelayAfterLastUserInteraction
    ? autoPlay?.restartDelayAfterLastUserInteraction
    : 3000;
  let maxItemRowRight: number;
  const isOdd = TOTAL_ITEMS % 2 === 0 ? false : true;
  if (isOdd) {
    maxItemRowRight = Math.floor(TOTAL_ITEMS / 2) * ITEM_DISPLAY_WIDTH;
  } else {
    maxItemRowRight = (TOTAL_ITEMS / 2) * ITEM_DISPLAY_WIDTH;
  }
  const LEFT_ODD_ITEMS_TO_MOVE = Math.floor(TOTAL_ITEMS / 2);
  const LEFT_EVEN_ITEMS_TO_MOVE = Math.floor(TOTAL_ITEMS / 2) - 1;
  const RIGHT_ODD_ITEMS_TO_MOVE = Math.floor(TOTAL_ITEMS / 2) * -1;
  const RIGHT_EVEN_ITEMS_TO_MOVE = (TOTAL_ITEMS / 2) * -1;
  const firstItemIndex = isOdd ? Math.floor(TOTAL_ITEMS / 2) : TOTAL_ITEMS / 2;

  const [isOverFlowShown, setIsOverflowShown] = useState<boolean>(false); //isOverFlowShown is for dveelopment
  const [itemsOne, setItemsOne] = useState<CarouselElement[]>(items);
  const [itemsTwo, setItemsTwo] = useState<CarouselElement[]>(items);
  const [itemOneRowRight, setItemOneRowRight] =
    useState<number>(maxItemRowRight);
  const [itemTwoRowRight, setItemTwoRowRight] =
    useState<number>(maxItemRowRight);
  const [activeItemsRow, setActiveItemsRow] = useState<1 | 2>(1);
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

  const {
    itemDisplayBoxStyles,
    overRiddableItemRowStyles,
  }: {
    itemDisplayBoxStyles: SxProps<Theme>;
    overRiddableItemRowStyles: SxProps<Theme>;
  } = initSXProps();

  const updateItemsOne = useCallback(() => {
    //Move items left
    if (itemOneRowRight === MAX_WIDTH_TO_RIGHT_OF_DISPLAY_ITEM) {
      let newItemsRowTwo = itemsTwo.slice();
      //move first entry to end
      const firstItemsRowTwo = isOdd
        ? newItemsRowTwo.slice(0, LEFT_ODD_ITEMS_TO_MOVE)
        : newItemsRowTwo.slice(0, LEFT_EVEN_ITEMS_TO_MOVE);
      newItemsRowTwo.push(...firstItemsRowTwo);
      newItemsRowTwo = isOdd
        ? newItemsRowTwo.slice(LEFT_ODD_ITEMS_TO_MOVE)
        : newItemsRowTwo.slice(LEFT_EVEN_ITEMS_TO_MOVE);

      setItemsTwo(newItemsRowTwo);
      setItemTwoRowRight(maxItemRowRight);
      setActiveItemsRow(2);

      //Above needs to be completed before the below runs
      setItemOneRowRight(maxItemRowRight);
      let newItemsRowOne = itemsOne.slice();
      //move first entry to end
      const firstItemsRowOne = isOdd
        ? newItemsRowOne.slice(0, LEFT_ODD_ITEMS_TO_MOVE)
        : newItemsRowOne.slice(0, LEFT_EVEN_ITEMS_TO_MOVE);
      newItemsRowOne.push(...firstItemsRowOne);
      newItemsRowOne = isOdd
        ? newItemsRowOne.slice(LEFT_ODD_ITEMS_TO_MOVE)
        : newItemsRowOne.slice(LEFT_EVEN_ITEMS_TO_MOVE);
      setItemsOne(newItemsRowOne);
    }

    //Move items right
    if (itemOneRowRight === 0) {
      let newItemsRowTwo = itemsTwo.slice();

      //remove the last entry and add it to the start
      const lastItemsRowTwo = isOdd
        ? newItemsRowTwo.slice(RIGHT_ODD_ITEMS_TO_MOVE)
        : newItemsRowTwo.slice(RIGHT_EVEN_ITEMS_TO_MOVE);
      newItemsRowTwo.unshift(...lastItemsRowTwo);
      newItemsRowTwo = isOdd
        ? newItemsRowTwo.slice(0, RIGHT_ODD_ITEMS_TO_MOVE)
        : newItemsRowTwo.slice(0, RIGHT_EVEN_ITEMS_TO_MOVE);

      setItemsTwo(newItemsRowTwo);
      setItemTwoRowRight(maxItemRowRight);
      setActiveItemsRow(2);

      //Above needs to be completed before the below runs
      setItemOneRowRight(maxItemRowRight);
      let newItemsRowOne = itemsOne.slice();
      //remove the last entry and add it to the start
      const lastItemsRowOne = isOdd
        ? newItemsRowOne.slice(RIGHT_ODD_ITEMS_TO_MOVE)
        : newItemsRowOne.slice(RIGHT_EVEN_ITEMS_TO_MOVE);
      newItemsRowOne.unshift(...lastItemsRowOne);
      newItemsRowOne = isOdd
        ? newItemsRowOne.slice(0, RIGHT_ODD_ITEMS_TO_MOVE)
        : newItemsRowOne.slice(0, RIGHT_EVEN_ITEMS_TO_MOVE);
      setItemsOne(newItemsRowOne);
    }
  }, [
    LEFT_EVEN_ITEMS_TO_MOVE,
    LEFT_ODD_ITEMS_TO_MOVE,
    MAX_WIDTH_TO_RIGHT_OF_DISPLAY_ITEM,
    RIGHT_EVEN_ITEMS_TO_MOVE,
    RIGHT_ODD_ITEMS_TO_MOVE,
    itemOneRowRight,
    itemsOne,
    itemsTwo,
    isOdd,
    maxItemRowRight,
  ]);

  const updateItemsTwo = useCallback(() => {
    //Move items left
    if (itemTwoRowRight === MAX_WIDTH_TO_RIGHT_OF_DISPLAY_ITEM) {
      let newItemsRowOne = itemsOne.slice();
      //move first entry to end
      const firstItemsRowOne = isOdd
        ? newItemsRowOne.slice(0, LEFT_ODD_ITEMS_TO_MOVE)
        : newItemsRowOne.slice(0, LEFT_EVEN_ITEMS_TO_MOVE);
      newItemsRowOne.push(...firstItemsRowOne);
      newItemsRowOne = isOdd
        ? newItemsRowOne.slice(LEFT_ODD_ITEMS_TO_MOVE)
        : newItemsRowOne.slice(LEFT_EVEN_ITEMS_TO_MOVE);
      setItemsOne(newItemsRowOne);
      setItemOneRowRight(maxItemRowRight);
      setActiveItemsRow(1);

      //Above needs to be completed before the below runs
      setItemTwoRowRight(maxItemRowRight);
      let newItemsRowTwo = itemsTwo.slice();
      //move first entry to end
      const firstItemsRowTwo = isOdd
        ? newItemsRowTwo.slice(0, LEFT_ODD_ITEMS_TO_MOVE)
        : newItemsRowTwo.slice(0, LEFT_EVEN_ITEMS_TO_MOVE);
      newItemsRowTwo.push(...firstItemsRowTwo);
      newItemsRowTwo = isOdd
        ? newItemsRowTwo.slice(LEFT_ODD_ITEMS_TO_MOVE)
        : newItemsRowTwo.slice(LEFT_EVEN_ITEMS_TO_MOVE);
      setItemsTwo(newItemsRowTwo);
    }

    //Move items right
    if (itemTwoRowRight === 0) {
      let newItemsRowOne = itemsOne.slice();
      //remove the last entry and add it to the start
      const lastItemsRowOne = isOdd
        ? newItemsRowOne.slice(RIGHT_ODD_ITEMS_TO_MOVE)
        : newItemsRowOne.slice(RIGHT_EVEN_ITEMS_TO_MOVE);
      newItemsRowOne.unshift(...lastItemsRowOne);
      newItemsRowOne = isOdd
        ? newItemsRowOne.slice(0, RIGHT_ODD_ITEMS_TO_MOVE)
        : newItemsRowOne.slice(0, RIGHT_EVEN_ITEMS_TO_MOVE);

      setItemsOne(newItemsRowOne);
      setItemOneRowRight(maxItemRowRight);
      setActiveItemsRow(1);

      //Above needs to be completed before the below runs
      setItemTwoRowRight(maxItemRowRight);
      let newItemsRowTwo = itemsTwo.slice();
      //remove the last entry and add it to the start
      const lastItemsRowTwo = isOdd
        ? newItemsRowTwo.slice(RIGHT_ODD_ITEMS_TO_MOVE)
        : newItemsRowTwo.slice(RIGHT_EVEN_ITEMS_TO_MOVE);
      newItemsRowTwo.unshift(...lastItemsRowTwo);
      newItemsRowTwo = isOdd
        ? newItemsRowTwo.slice(0, RIGHT_ODD_ITEMS_TO_MOVE)
        : newItemsRowTwo.slice(0, RIGHT_EVEN_ITEMS_TO_MOVE);
      setItemsTwo(newItemsRowTwo);
    }
  }, [
    LEFT_EVEN_ITEMS_TO_MOVE,
    LEFT_ODD_ITEMS_TO_MOVE,
    MAX_WIDTH_TO_RIGHT_OF_DISPLAY_ITEM,
    RIGHT_EVEN_ITEMS_TO_MOVE,
    RIGHT_ODD_ITEMS_TO_MOVE,
    itemTwoRowRight,
    itemsOne,
    itemsTwo,
    isOdd,
    maxItemRowRight,
  ]);

  const moveRightWithAutoPlay = useCallback(() => {
    if (!disableControls.current) {
      setItemOneRowRight((width) => width - ITEM_DISPLAY_WIDTH);
      setItemTwoRowRight((width) => width - ITEM_DISPLAY_WIDTH);
    }
  }, [ITEM_DISPLAY_WIDTH]);

  const moveLeftWithAutoPlay = useCallback(() => {
    if (!disableControls.current) {
      setItemOneRowRight((width) => width + ITEM_DISPLAY_WIDTH);
      setItemTwoRowRight((width) => width + ITEM_DISPLAY_WIDTH);
    }
  }, [ITEM_DISPLAY_WIDTH]);

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
      if (autoPlay && autoPlay.enableAutoPlay) {
        restartAutoPlayUponIdleTimeoutId.current &&
          clearTimeout(restartAutoPlayUponIdleTimeoutId.current);
        restartAutoPlayUponIdleTimeoutId.current = setTimeout(() => {
          if (!disableControls.current) {
            startAutoPlay(autoPlay.delay, autoPlay.direction);
          } else {
            restartAutoPlayUponIdle(RESTART_AUTOPLAY_DELAY);
          }
        }, delay);
      }
    },
    [RESTART_AUTOPLAY_DELAY, autoPlay, startAutoPlay]
  );

  function initSXProps() {
    let itemDisplayBoxStyles: SxProps<Theme> = {
      maxWidth: "100%",
      position: "relative",
      overflow: "hidden",
    };
    let overRiddableItemRowStyles: SxProps<Theme> = {
      position: "absolute",
      backgroundColor: "transparent",
    };

    if (styles?.itemDisplayBox) {
      itemDisplayBoxStyles = {
        ...itemDisplayBoxStyles,
        ...styles.itemDisplayBox,
      };
    }

    if (styles?.itemDisplayBox) {
      overRiddableItemRowStyles = {
        ...overRiddableItemRowStyles,
        ...styles.itemRow,
      };
    }
    return { itemDisplayBoxStyles, overRiddableItemRowStyles };
  }

  function stopAutoPlay() {
    autoPlayIntervalIds.current.forEach((intervalId) =>
      clearInterval(intervalId)
    );
    autoPlayIntervalIds.current = [];
  }

  //Clear interval ids on navaway.
  useEffect(() => {
    return () => stopAutoPlay();
  }, []);

  useEffect(() => {
    const itemRowEle = document.querySelector("#item-row-1");
    itemRowEle && itemRowEle.addEventListener("transitionend", updateItemsOne);
    itemRowEle &&
      itemRowEle.addEventListener("transitionend", activateControls);

    itemRowEle &&
      itemRowEle.addEventListener("transitionstart", deactivateControls);

    return () => {
      itemRowEle?.removeEventListener("transitionend", updateItemsOne);
      itemRowEle?.removeEventListener("transitionend", activateControls);
      itemRowEle?.removeEventListener("transitionstart", deactivateControls);
    };
  }, [
    MAX_WIDTH_TO_RIGHT_OF_DISPLAY_ITEM,
    activateControls,
    deactivateControls,
    itemOneRowRight,
    itemsOne,
    itemsTwo,
    isOdd,
    maxItemRowRight,
    updateItemsOne,
  ]);

  useEffect(() => {
    const itemRowEle = document.querySelector("#item-row-2");
    itemRowEle && itemRowEle.addEventListener("transitionend", updateItemsTwo);
    itemRowEle &&
      itemRowEle.addEventListener("transitionend", activateControls);

    itemRowEle &&
      itemRowEle.addEventListener("transitionstart", deactivateControls);

    return () => {
      itemRowEle?.removeEventListener("transitionend", updateItemsTwo);
      itemRowEle?.removeEventListener("transitionend", activateControls);
      itemRowEle?.removeEventListener("transitionstart", deactivateControls);
    };
  }, [
    MAX_WIDTH_TO_RIGHT_OF_DISPLAY_ITEM,
    activateControls,
    deactivateControls,
    itemTwoRowRight,
    itemsOne,
    itemsTwo,
    isOdd,
    maxItemRowRight,
    updateItemsTwo,
  ]);

  const renderedItemsOne = useMemo(
    () =>
      itemsOne.map((item, index) => {
        return (
          <Box
            key={item.key + "-1-" + index + 1}
            width={`${ITEM_DISPLAY_WIDTH}${ITEM_DISPLAY_WIDTH_UNIT}`}
            height={`${ITEM_DISPLAY_HEIGHT}${ITEM_DISPLAY_HEIGHT_UNIT}`}
            flexShrink={0}
            flexGrow={0}>
            {item.element}
          </Box>
        );
      }),
    [
      itemsOne,
      ITEM_DISPLAY_WIDTH,
      ITEM_DISPLAY_WIDTH_UNIT,
      ITEM_DISPLAY_HEIGHT,
      ITEM_DISPLAY_HEIGHT_UNIT,
    ]
  );

  const renderedItemsTwo = useMemo(
    () =>
      itemsTwo.map((item, index) => {
        return (
          <Box
            key={item.key + "-2-" + index + 1}
            width={`${ITEM_DISPLAY_WIDTH}${ITEM_DISPLAY_WIDTH_UNIT}`}
            height={`${ITEM_DISPLAY_HEIGHT}${ITEM_DISPLAY_HEIGHT_UNIT}`}
            flexShrink={0}
            flexGrow={0}>
            {item.element}
          </Box>
        );
      }),
    [
      ITEM_DISPLAY_HEIGHT,
      ITEM_DISPLAY_HEIGHT_UNIT,
      ITEM_DISPLAY_WIDTH,
      ITEM_DISPLAY_WIDTH_UNIT,
      itemsTwo,
    ]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      triggerRerender();
    }
  }, [triggerRerender]);

  function checkForPropsErrors() {
    if (items.length < 2) {
      throw new Error("You must include at least two carousel items.");
    }
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
      stopAutoPlay();
      restartAutoPlayUponIdle(RESTART_AUTOPLAY_DELAY);
      if (!disableControls.current) {
        // restartAutoPlayUponIdle(RESTART_AUTOPLAY_DELAY);
        setItemOneRowRight((width) => width + ITEM_DISPLAY_WIDTH);
        setItemTwoRowRight((width) => width + ITEM_DISPLAY_WIDTH);
      }
    }
    return {
      subscribe: moveLeftManualControls,
    };
  }, [ITEM_DISPLAY_WIDTH, RESTART_AUTOPLAY_DELAY, restartAutoPlayUponIdle]);
  const moveRightSubscription = useMemo(() => {
    function moveRightManualControls() {
      stopAutoPlay();
      restartAutoPlayUponIdle(RESTART_AUTOPLAY_DELAY);
      if (!disableControls.current) {
        // restartAutoPlayUponIdle(RESTART_AUTOPLAY_DELAY);
        setItemOneRowRight((width) => width - ITEM_DISPLAY_WIDTH);
        setItemTwoRowRight((width) => width - ITEM_DISPLAY_WIDTH);
      }
    }
    return {
      subscribe: moveRightManualControls,
    };
  }, [ITEM_DISPLAY_WIDTH, RESTART_AUTOPLAY_DELAY, restartAutoPlayUponIdle]);

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
    <Box
      id="item-display-box"
      width={`${ITEM_DISPLAY_WIDTH}${ITEM_DISPLAY_WIDTH_UNIT}`}
      height={`${ITEM_DISPLAY_HEIGHT}${ITEM_DISPLAY_HEIGHT_UNIT}`}
      sx={itemDisplayBoxStyles}>
      <Stack
        direction="row"
        id="item-row-1"
        sx={{
          width: `${ITEM_DISPLAY_WIDTH}${ITEM_DISPLAY_WIDTH_UNIT}`,
          height: `${ITEM_DISPLAY_HEIGHT}${ITEM_DISPLAY_HEIGHT_UNIT}`,
          display: `${activeItemsRow === 1 ? "flex" : "none"}`,
          transition: `right ${
            transitions
              ? transitions.durationMs + "ms"
              : DEFAULT_TRANSITION_DURATION + "ms"
          } ${transitions ? transitions.easingFunction : "ease-out"} `,
          right: `${itemOneRowRight}${ITEM_DISPLAY_WIDTH_UNIT}`,
          ...overRiddableItemRowStyles,
        }}>
        {renderedItemsOne}
      </Stack>
      <Stack
        direction="row"
        id="item-row-2"
        sx={{
          width: `${ITEM_DISPLAY_WIDTH}${ITEM_DISPLAY_WIDTH_UNIT}`,
          height: `${ITEM_DISPLAY_HEIGHT}${ITEM_DISPLAY_HEIGHT_UNIT}`,
          display: `${activeItemsRow === 2 ? "flex" : "none"}`,
          transition: `right ${
            transitions
              ? transitions.durationMs + "ms"
              : DEFAULT_TRANSITION_DURATION + "ms"
          } ${transitions ? transitions.easingFunction : "ease-out"} `,
          right: `${itemTwoRowRight}${ITEM_DISPLAY_WIDTH_UNIT}`, //decreasing the value 'right' moves the items from left to right
          ...overRiddableItemRowStyles,
        }}>
        {renderedItemsTwo}
      </Stack>
      {children}
    </Box>
  );
}

function increaseArrayIfTooSmall(itemsArr: CarouselElement[]) {
  let multiplier = 0;
  if (itemsArr.length === 2 || itemsArr.length === 3) {
    multiplier = 3;
  } else if (itemsArr.length === 4) {
    multiplier = 2;
  }
  if (multiplier !== 0) {
    const newItemsArr = [];
    for (let i = 0; i < multiplier; i++) {
      newItemsArr.push(...itemsArr);
    }
    itemsArr = newItemsArr;
  }
  return itemsArr;
}
