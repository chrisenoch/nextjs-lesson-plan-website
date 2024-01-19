"use client";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export function Carousel() {
  const imagesArr = [
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

  const maxImageRowRight = imagesArr.length * 200 - 200;
  const [imagesOne, setImagesOne] = useState<any[]>(imagesArr);
  const [imagesTwo, setImagesTwo] = useState<any[]>(imagesArr);
  const [imageOneRowRight, setImageOneRowRight] = useState<number>(
    Math.floor(maxImageRowRight / 2)
  );
  // const [imageOneRowRight, setImageOneRowRight] =
  //   useState<number>(maxImageRowRight);
  const [imageTwoRowRight, setImageTwoRowRight] =
    useState<number>(maxImageRowRight);
  const [activeImageRow, setActiveImageRow] = useState<1 | 2>(1);

  useEffect(() => {
    console.log("In imageOne effect");
    function updateImagesOne() {
      console.log("Transition ended imageOneRow");
      // if (imageOneRowRight === 0) {
      //   console.log("in if imageOneRowRight 0");
      //   const newImagesRowTwo = imagesTwo.slice();
      //   const firstImgRowTwo = newImagesRowTwo.shift();
      //   newImagesRowTwo.push(firstImgRowTwo);
      //   setImagesTwo(newImagesRowTwo);
      //   setImageTwoRowRight(totalImagesLength);
      //   setActiveImageRow(2);

      //   //Above needs to be completed before the below runs
      //   setImageOneRowRight(totalImagesLength);
      //   const newImagesRowOne = imagesOne.slice();
      //   const firstImgRowOne = newImagesRowOne.shift();
      //   newImagesRowOne.push(firstImgRowOne);
      //   setImagesOne(newImagesRowOne);
      // }

      if (imageOneRowRight === maxImageRowRight) {
        console.log("in if imageOneRowRight totalImagesLength");
        const newImagesRowTwo = imagesTwo.slice();
        const lastImgRowTwo = newImagesRowTwo.pop();
        newImagesRowTwo.unshift(lastImgRowTwo);
        setImagesTwo(newImagesRowTwo);
        setImageTwoRowRight(0);
        setActiveImageRow(2);

        //Above needs to be completed before the below runs
        setImageOneRowRight(0);
        const newImagesRowOne = imagesOne.slice();
        const lastImgRowOne = newImagesRowOne.pop();
        newImagesRowOne.unshift(lastImgRowOne);
        setImagesOne(newImagesRowOne);
      }
    }
    const transition = document.querySelector("#image-row-1");
    transition && transition.addEventListener("transitionend", updateImagesOne);

    return () =>
      transition?.removeEventListener("transitionend", updateImagesOne);
  }, [imageOneRowRight, imagesOne, imagesTwo, maxImageRowRight]);

  //To do: Extract duplicate code
  useEffect(() => {
    console.log("In imageTwo effect");
    function updateImagesTwo() {
      console.log("Transition ended imageTwoRow");

      // if (imageTwoRowRight === 0) {
      //   console.log("in if imageTwoRowRight");

      //   const newImagesRowOne = imagesOne.slice(); //think this is the bit that needs -200
      //   const firstImgRowOne = newImagesRowOne.shift();
      //   newImagesRowOne.push(firstImgRowOne);
      //   setImagesOne(newImagesRowOne);
      //   setImageOneRowRight(totalImagesLength);
      //   setActiveImageRow(1);

      //   //Above needs to be completed before the below runs
      //   setImageTwoRowRight(totalImagesLength);
      //   const newImagesRowTwo = imagesTwo.slice();

      //   const firstImgRowTwo = newImagesRowTwo.shift();
      //   newImagesRowTwo.push(firstImgRowTwo);
      //   setImagesTwo(newImagesRowTwo);
      // }

      if (imageTwoRowRight === maxImageRowRight) {
        console.log("in if imageTwoRowRight totalImagesLength");
        const newImagesRowOne = imagesOne.slice();
        const lastImgRowOne = newImagesRowOne.pop();
        newImagesRowOne.unshift(lastImgRowOne);
        setImagesOne(newImagesRowOne);
        setImageOneRowRight(0);
        setActiveImageRow(1);

        //Above needs to be completed before the below runs
        setImageTwoRowRight(0);
        const newImagesRowTwo = imagesTwo.slice();
        const lastImgRowTwo = newImagesRowTwo.pop();
        newImagesRowTwo.unshift(lastImgRowTwo);
        setImagesTwo(newImagesRowTwo);
      }
    }
    const transition = document.querySelector("#image-row-2");
    transition && transition.addEventListener("transitionend", updateImagesTwo);
    return () =>
      transition?.removeEventListener("transitionend", updateImagesTwo);
  }, [imageTwoRowRight, imagesOne, imagesTwo, maxImageRowRight]);

  const renderedImagesOne = useMemo(
    () =>
      imagesOne.map((image, index, arr) => {
        console.log("map renderedImagesOne runs");
        //const imgWidth = index === 0 ? 0 : 200;

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

  console.log("renderedImagesOne ");
  console.log(renderedImagesOne);
  console.log("renderedImagesTwo ");
  console.log(renderedImagesTwo);

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
      <Stack direction={"row"}>
        <Box>Hello</Box>
        <Box
          id="image-display-box"
          width="200px"
          height="200px"
          overflow="hidden"
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
          Left
        </Button>
        <Button onClick={moveRight} variant="outlined">
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

        {/* <Button
          onClick={() => setFirstImageWidth((px) => px + 200)}
          variant="outlined">
          Increase width of first image
        </Button>
        <Button
          onClick={() => setFirstImageWidth((px) => px - 200)}
          variant="outlined">
          Decrease width of first image
        </Button> */}
      </Stack>
    </>
  );
}
