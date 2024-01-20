"use client";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export function Carousel() {
  const imagesArr = [
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
      alt: "Driverless cars-1",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    },
    {
      alt: "Shopping-1",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    },
    {
      alt: "Beach-2",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    },
    {
      alt: "Driverless cars-2",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    },
    {
      alt: "Shopping-2",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    },
    {
      alt: "Beach-3",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    },
    {
      alt: "Driverless cars-3",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    },
    {
      alt: "Shopping-3",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    },
  ];

  const IMG_WIDTH = 200;
  const TOTAL_IMGS = imagesArr.length;
  const MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG = TOTAL_IMGS * IMG_WIDTH - IMG_WIDTH;
  //const maxImageRowRight = imagesArr.length * 200 + 200 + 200;
  //let maxImageRowRight = 800;
  let maxImageRowRight: number;
  const isOdd = TOTAL_IMGS % 2 === 0 ? false : true;
  if (!isOdd) {
    maxImageRowRight = Math.ceil(TOTAL_IMGS / 2) * IMG_WIDTH;
  } else {
    maxImageRowRight = Math.floor(TOTAL_IMGS / 2) * IMG_WIDTH;
  }

  console.log("maxImageRowRight " + maxImageRowRight);

  const [isOverFlowHidden, setOverflowHidden] = useState<boolean>(true);
  const [imagesOne, setImagesOne] = useState<any[]>(imagesArr);
  const [imagesTwo, setImagesTwo] = useState<any[]>(imagesArr);
  const [imageOneRowRight, setImageOneRowRight] =
    useState<number>(maxImageRowRight);
  const [imageTwoRowRight, setImageTwoRowRight] =
    useState<number>(maxImageRowRight);
  const [activeImageRow, setActiveImageRow] = useState<1 | 2>(1);

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
    const imageRowEle = document.querySelector("#image-row-1");
    imageRowEle &&
      imageRowEle.addEventListener("transitionend", updateImagesOne);

    return () =>
      imageRowEle?.removeEventListener("transitionend", updateImagesOne);
  }, [
    MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG,
    imageOneRowRight,
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
    const imageRowEle = document.querySelector("#image-row-2");
    imageRowEle &&
      imageRowEle.addEventListener("transitionend", updateImagesTwo);
    return () =>
      imageRowEle?.removeEventListener("transitionend", updateImagesTwo);
  }, [
    MAX_WIDTH_TO_RIGHT_OF_DISPLAY_IMG,
    imageTwoRowRight,
    imagesOne,
    imagesTwo,
    isOdd,
    maxImageRowRight,
  ]);

  const renderedImagesOne = useMemo(
    () =>
      imagesOne.map((image, index, arr) => {
        console.log("map renderedImagesOne runs");

        return (
          <Image
            key={image.alt + "-1"}
            alt={image.alt}
            src={image.imgPath}
            //width={index === 0 ? firstImageWidth : 200}
            width={200}
            height={200}
            style={{
              maxWidth: "100%",
              transition: "width .5s ease-out",
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
        //const imgWidth = index === 0 ? 0 : 200;

        return (
          <Image
            key={image.alt + "-2"}
            alt={image.alt}
            src={image.imgPath}
            //width={index === 0 ? firstImageWidth : 200}
            width={200}
            height={200}
            style={{
              maxWidth: "100%",
              transition: "width .5s ease-out",
            }}
            priority={index === 0 ? true : false}
          />
        );
      }),
    [imagesTwo]
  );

  function moveRight() {
    setImageOneRowRight((px) => px - 200);
    setImageTwoRowRight((px) => px - 200);
  }

  function moveLeft() {
    setImageOneRowRight((px) => px + 200);
    setImageTwoRowRight((px) => px + 200);
  }

  const imageRowOneDisplay = activeImageRow === 1 ? "flex" : "none";
  const imageRowTwoDisplay = activeImageRow === 2 ? "flex" : "none";
  return (
    <>
      <Stack>
        <Box
          marginLeft="-200px"
          height="200px"
          width={maxImageRowRight}
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
        </Box>
      </Stack>
      <Stack direction={"row"}>
        <Button onClick={moveLeft} color="secondary" variant="outlined">
          **LEFT**
        </Button>
        <Button onClick={moveRight} variant="contained">
          Right
        </Button>
        <Button
          onClick={() =>
            activeImageRow === 1 ? setActiveImageRow(2) : setActiveImageRow(1)
          }
          color="secondary"
          variant="outlined">
          Change active image index.
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
