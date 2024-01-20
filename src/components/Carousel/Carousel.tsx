"use client";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

export function Carousel({
  autoPlayDirection,
  autoPlayDelay,
  enableAutoPlay,
}: {
  autoPlayDirection: "LEFT" | "RIGHT";
  autoPlayDelay: number;
  enableAutoPlay: boolean;
}) {
  let imagesArr = [
    // {
    //   alt: "Giraffes",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/giraffes_south_africa.jpg",
    // },

    // {
    //   alt: "Fortress",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/Narilka%20fortress%20Tbilisi.jpg",
    // },
    // {
    //   alt: "Virgin",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/virgin_cruises.jpg",
    // },

    // {
    //   alt: "Antalya",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/antalya-shutterstock.jpg",
    // },
    // {
    //   alt: "Fuerteventura",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/fuerteventura-shutterstock.jpg",
    // },
    {
      alt: "Beach-1",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    },
    {
      alt: "Driverless-1",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    },
    {
      alt: "Shopping-1",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    },
    // {
    //   alt: "Beach-2",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    // },
    // {
    //   alt: "Driverless cars-2",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    // },
    // {
    //   alt: "Shopping-2",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    // },
    // {
    //   alt: "Beach-3",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    // },
    // {
    //   alt: "Driverless cars-3",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    // },
    // {
    //   alt: "Shopping-3",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    // },
    // {
    //   alt: "Beach-4",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    // },
    // {
    //   alt: "Driverless cars-4",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    // },
    // {
    //   alt: "Shopping-4",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    // },
    // {
    //   alt: "Beach-5",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    // },
    // {
    //   alt: "Driverless cars-5",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    // },
    // {
    //   alt: "Shopping-5",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    // },
    // {
    //   alt: "Beach-6",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    // },
    // {
    //   alt: "Driverless cars-6",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    // },
    // {
    //   alt: "Shopping-6",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    // },
    // {
    //   alt: "Beach-7",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    // },
    // {
    //   alt: "Driverless cars-7",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    // },
    // {
    //   alt: "Shopping-7",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    // },
    // {
    //   alt: "Beach-8",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    // },
    // {
    //   alt: "Driverless cars-8",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    // },
    // {
    //   alt: "Shopping-8",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    // },
    // {
    //   alt: "Beach-9",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    // },
    // {
    //   alt: "Driverless cars-9",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    // },
    // {
    //   alt: "Shopping-9",
    //   imgPath:
    //     "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    // },
  ];
  imagesArr = increaseArrayIfTooSmall(imagesArr);
  const IMG_WIDTH = 200;
  const TOTAL_IMGS = imagesArr.length;
  const MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG = TOTAL_IMGS * IMG_WIDTH - IMG_WIDTH;
  let maxImageRowRight: number;
  const isOdd = TOTAL_IMGS % 2 === 0 ? false : true;
  if (isOdd) {
    maxImageRowRight = Math.floor(TOTAL_IMGS / 2) * IMG_WIDTH;
  } else {
    maxImageRowRight = Math.ceil(TOTAL_IMGS / 2) * IMG_WIDTH;
  }
  const [isOverFlowHidden, setOverflowHidden] = useState<boolean>(false);
  const [imagesOne, setImagesOne] = useState<any[]>(imagesArr);
  const [imagesTwo, setImagesTwo] = useState<any[]>(imagesArr);
  const [imageOneRowRight, setImageOneRowRight] =
    useState<number>(maxImageRowRight);
  const [imageTwoRowRight, setImageTwoRowRight] =
    useState<number>(maxImageRowRight);
  const [activeImageRow, setActiveImageRow] = useState<1 | 2>(1);
  const [disableControls, setDisableControls] = useState<boolean>(false);
  const autoPlayIntervalIds = useRef<ReturnType<typeof setInterval>[]>([]);

  const stopAutoPlayIfActiveTimeoutId = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const resumeAutoPlayIfActiveTimeoutId = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const shouldAutoPlay = useRef<boolean>(true);

  const deactivateControls = useCallback(() => {
    console.log("in deactivateControls");
    setDisableControls(true);
  }, []);

  const activateControls = useCallback(() => {
    setDisableControls(false);
  }, []);

  const moveRight = useCallback(() => {
    console.log("in moveRight");
    if (!disableControls && imagesArr.length > 1) {
      console.log("in moveRight if");
      setImageOneRowRight((px) => px - 200);
      setImageTwoRowRight((px) => px - 200);
    }
  }, [disableControls, imagesArr.length]);

  const moveLeft = useCallback(() => {
    console.log("in moveLeft and value of disableControls: " + disableControls);
    if (!disableControls && imagesArr.length > 1) {
      console.log("in moveLeft if");
      setImageOneRowRight((px) => px + 200);
      setImageTwoRowRight((px) => px + 200);
    }
  }, [disableControls, imagesArr.length]);

  const startAutoPlay = useCallback(
    (delay: number, direction: "LEFT" | "RIGHT") => {
      console.log("before move should be fired");
      direction === "RIGHT" ? moveRight() : moveLeft();
      console.log("after move shud be fired");

      const intervalId = setInterval(() => {
        if (direction === "RIGHT") {
          moveRight();
        }
        if (direction === "LEFT") {
          moveLeft();
        }
      }, delay);

      autoPlayIntervalIds.current.push(intervalId);
      console.log(
        "number of interval ids " + autoPlayIntervalIds.current.length
      );
      // autoPlayIntervalId.current = setInterval(() => {
      //   if (direction === "RIGHT") {
      //     moveRight();
      //   }
      //   if (direction === "LEFT") {
      //     moveLeft();
      //   }
      // }, delay);
    },
    [moveLeft, moveRight]
  );

  function stopAutoPlay() {
    console.log("in stop autoplay");
    autoPlayIntervalIds.current.forEach((intervalId) =>
      clearInterval(intervalId)
    );
    autoPlayIntervalIds.current = [];
  }

  useEffect(() => {
    console.log("In imageOne effect");
    function updateImagesOne() {
      console.log("Transition ended imageOneRow");
      //Move images left
      if (imageOneRowRight === MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG) {
        let newImagesRowTwo = imagesTwo.slice();
        //move first entry to end
        const firstImgsRowTwo = isOdd
          ? newImagesRowTwo.slice(0, 1)
          : newImagesRowTwo.slice(0, 2);
        newImagesRowTwo.push(...firstImgsRowTwo);
        newImagesRowTwo = isOdd
          ? newImagesRowTwo.slice(1)
          : newImagesRowTwo.slice(2);

        setImagesTwo(newImagesRowTwo);
        setImageTwoRowRight(maxImageRowRight);
        setActiveImageRow(2);

        //Above needs to be completed before the below runs
        setImageOneRowRight(maxImageRowRight);
        let newImagesRowOne = imagesOne.slice();
        //move first entry to end
        const firstImgsRowOne = isOdd
          ? newImagesRowOne.slice(0, 1)
          : newImagesRowOne.slice(0, 2);
        newImagesRowOne.push(...firstImgsRowOne);
        newImagesRowOne = isOdd
          ? newImagesRowOne.slice(1)
          : newImagesRowOne.slice(2);
        setImagesOne(newImagesRowOne);
      }

      //Move images right
      if (imageOneRowRight === 0) {
        let newImagesRowTwo = imagesTwo.slice();

        //remove the last entry and add it to the start
        const lastImgsRowTwo = isOdd
          ? newImagesRowTwo.slice(-1)
          : newImagesRowTwo.slice(-3);
        newImagesRowTwo.unshift(...lastImgsRowTwo);
        newImagesRowTwo = isOdd
          ? newImagesRowTwo.slice(0, -1)
          : newImagesRowTwo.slice(0, -3);

        setImagesTwo(newImagesRowTwo);
        setImageTwoRowRight(maxImageRowRight);
        setActiveImageRow(2);

        //Above needs to be completed before the below runs
        setImageOneRowRight(maxImageRowRight);
        let newImagesRowOne = imagesOne.slice();
        //remove the last entry and add it to the start
        const lastImgsRowOne = isOdd
          ? newImagesRowOne.slice(-1)
          : newImagesRowOne.slice(-3);
        newImagesRowOne.unshift(...lastImgsRowOne);
        newImagesRowOne = isOdd
          ? newImagesRowOne.slice(0, -1)
          : newImagesRowOne.slice(0, -3);
        setImagesOne(newImagesRowOne);
      }
    }

    if (imagesArr.length > 1) {
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
    imagesArr.length,
    imagesOne,
    imagesTwo,
    isOdd,
    maxImageRowRight,
  ]);

  //To do: Extract duplicate code
  useEffect(() => {
    console.log("In imageTwo effect");
    function updateImagesTwo() {
      console.log("Transition ended imageTwoRow");

      //Move images left
      if (imageTwoRowRight === MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG) {
        let newImagesRowOne = imagesOne.slice();
        //move first entry to end
        const firstImgsRowOne = isOdd
          ? newImagesRowOne.slice(0, 1)
          : newImagesRowOne.slice(0, 2);
        newImagesRowOne.push(...firstImgsRowOne);
        newImagesRowOne = isOdd
          ? newImagesRowOne.slice(1)
          : newImagesRowOne.slice(2);
        setImagesOne(newImagesRowOne);
        setImageOneRowRight(maxImageRowRight);
        setActiveImageRow(1);

        //Above needs to be completed before the below runs
        setImageTwoRowRight(maxImageRowRight);
        let newImagesRowTwo = imagesTwo.slice();
        //move first entry to end
        const firstImgsRowTwo = isOdd
          ? newImagesRowTwo.slice(0, 1)
          : newImagesRowTwo.slice(0, 2);
        newImagesRowTwo.push(...firstImgsRowTwo);
        newImagesRowTwo = isOdd
          ? newImagesRowTwo.slice(1)
          : newImagesRowTwo.slice(2);
        setImagesTwo(newImagesRowTwo);
      }

      //Move images right
      if (imageTwoRowRight === 0) {
        let newImagesRowOne = imagesOne.slice();
        //remove the last entry and add it to the start
        const lastImgsRowOne = isOdd
          ? newImagesRowOne.slice(-1)
          : newImagesRowOne.slice(-3);
        newImagesRowOne.unshift(...lastImgsRowOne);
        newImagesRowOne = isOdd
          ? newImagesRowOne.slice(0, -1)
          : newImagesRowOne.slice(0, -3);

        setImagesOne(newImagesRowOne);
        setImageOneRowRight(maxImageRowRight);
        setActiveImageRow(1);

        //Above needs to be completed before the below runs
        setImageTwoRowRight(maxImageRowRight);
        let newImagesRowTwo = imagesTwo.slice();
        //remove the last entry and add it to the start
        const lastImgsRowTwo = isOdd
          ? newImagesRowTwo.slice(-1)
          : newImagesRowTwo.slice(-3);
        newImagesRowTwo.unshift(...lastImgsRowTwo);
        newImagesRowTwo = isOdd
          ? newImagesRowTwo.slice(0, -1)
          : newImagesRowTwo.slice(0, -3);
        setImagesTwo(newImagesRowTwo);
      }
    }

    if (imagesArr.length > 1) {
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
    imagesArr.length,
    imagesOne,
    imagesTwo,
    isOdd,
    maxImageRowRight,
  ]);

  useEffect(() => {
    function stopAutoPlayIfActive() {
      console.log("in stopAutoPlayIfActive");
      console.log(
        "value of shouldAutoPlay.current before set to false " +
          shouldAutoPlay.current
      );
      shouldAutoPlay.current = false;

      if (enableAutoPlay) {
        stopAutoPlay();
      }
    }
    // function stopAutoPlayIfActive() {
    //   console.log("in stopAutoPlayIfActive");
    //   stopAutoPlayIfActiveTimeoutId.current &&
    //     clearTimeout(stopAutoPlayIfActiveTimeoutId.current);
    //   stopAutoPlayIfActiveTimeoutId.current = setTimeout(() => {
    //     if (enableAutoPlay) {
    //       stopAutoPlay();
    //     }
    //   }, 300);
    // }

    function resumeAutoPlayIfActive() {
      console.log("in resumeAutoPlayIfActive");

      console.log(
        "value of shouldAutoPlay.current before set to true " +
          shouldAutoPlay.current
      );

      shouldAutoPlay.current = true;

      if (enableAutoPlay) {
        startAutoPlay(autoPlayDelay, autoPlayDirection);
      }

      // stopAutoPlayIfActiveTimeoutId.current &&
      //   clearTimeout(stopAutoPlayIfActiveTimeoutId.current);
      // stopAutoPlayIfActiveTimeoutId.current = setTimeout(() => {
      //   if (enableAutoPlay) {
      //     startAutoPlay(autoPlayDelay, autoPlayDirection);
      //   }
      // }, 300);
    }

    const imageDisplayBoxEle = document.querySelector("#image-display-box");
    imageDisplayBoxEle?.addEventListener("mouseenter", stopAutoPlayIfActive);
    imageDisplayBoxEle?.addEventListener("mouseleave", resumeAutoPlayIfActive);
    return () => {
      imageDisplayBoxEle?.removeEventListener(
        "mouseenter",
        stopAutoPlayIfActive
      );
      imageDisplayBoxEle?.removeEventListener(
        "mouseleave",
        resumeAutoPlayIfActive
      );
    };
  }, [autoPlayDelay, autoPlayDirection, enableAutoPlay, startAutoPlay]);

  const renderedImagesOne = useMemo(
    () =>
      imagesOne.map((image, index, arr) => {
        console.log("map renderedImagesOne runs");

        return (
          <Image
            key={image.alt + "-1-" + index + 1}
            alt={image.alt}
            src={image.imgPath}
            //width={index === 0 ? firstImageWidth : 200}
            width={200}
            height={200}
            style={{
              maxWidth: "100%",
            }}
            priority={index === 0 ? true : false}
          />
        );
      }),
    [imagesOne]
  );

  const renderedImagesTwo = useMemo(
    () =>
      imagesTwo.map((image, index, arr) => {
        console.log("map runs renderedImagesTwo");
        return (
          <Image
            key={image.alt + "-2-" + index + 1}
            alt={image.alt}
            src={image.imgPath}
            width={200}
            height={200}
            style={{
              maxWidth: "100%",
            }}
            priority={index === 0 ? true : false}
          />
        );
      }),
    [imagesTwo]
  );

  const imageRowOneDisplay = activeImageRow === 1 ? "flex" : "none";
  const imageRowTwoDisplay = activeImageRow === 2 ? "flex" : "none";
  return (
    <>
      <Stack>
        <Box
          marginLeft="-200px"
          height="200px"
          width={maxImageRowRight + 200}
          sx={{
            backgroundColor: "gray",
          }}></Box>
        <Box
          id="image-display-box"
          width="200px"
          height="200px"
          overflow={isOverFlowHidden ? "visible" : "hidden"}
          marginLeft="500px"
          position="relative">
          <Stack
            direction="row"
            id="image-row-1"
            sx={{
              width: "200px",
              display: `${imageRowOneDisplay}`,
              height: "200px",
              backgroundColor: "gray",
              transition: "right .5s ease-out",
              position: "absolute",
              //right: "totalImagesLengthpx", //decreasing the value 'right' moves the Images from left to right
              right: `${imageOneRowRight}px`,
            }}>
            {renderedImagesOne}
          </Stack>
          <Stack
            direction="row"
            id="image-row-2"
            sx={{
              width: "200px",
              display: `${imageRowTwoDisplay}`,
              height: "200px",
              backgroundColor: "gray",
              transition: "right .5s ease-out",
              position: "absolute",
              //right: "totalImagesLengthpx", //decreasing the value 'right' moves the Images from left to right
              right: `${imageTwoRowRight}px`,
            }}>
            {renderedImagesTwo}
          </Stack>
          <Stack
            marginTop={1}
            direction={"row"}
            sx={{
              position: "absolute",
              transform: "translatex(-50%)",
              left: "50%",
              bottom: "0px",
            }}>
            <Button
              id="left-button"
              size="small"
              onClick={moveLeft}
              color="secondary"
              variant="outlined"
              sx={{
                color: "white",
              }}>
              LEFT
            </Button>
            <Button
              id="right-button"
              size="small"
              onClick={moveRight}
              variant="outlined">
              Right
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Stack marginTop={8} direction={"row"}>
        <Button onClick={() => startAutoPlay(2000, "LEFT")} variant="outlined">
          Autoplay Left
        </Button>
        <Button onClick={() => startAutoPlay(2000, "RIGHT")} variant="outlined">
          AutoPlay Right
        </Button>
        <Button onClick={stopAutoPlay} variant="outlined">
          Stop Autoplay
        </Button>
        <Button
          onClick={() =>
            setOverflowHidden((isOverFlowHidden) => !isOverFlowHidden)
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
  imagesArr: { alt: string; imgPath: string }[]
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
