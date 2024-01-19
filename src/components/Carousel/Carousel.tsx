"use client";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

export function Carousel() {
  const imagesArr = [
    {
      alt: "Beach",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    },
    {
      alt: "Driverless cars",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    },
    {
      alt: "Shopping",
      imgPath:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    },
  ];

  const [imagesOne, setImagesOne] = useState<any[]>(imagesArr);
  const [imagesTwo, setImagesTwo] = useState<any[]>(imagesArr);
  const [imageOneRowRight, setImageOneRowRight] = useState<number>(400);
  const [imageTwoRowRight, setImageTwoRowRight] = useState<number>(400);
  const [activeImageRow, setActiveImageRow] = useState<1 | 2>(1);

  useEffect(() => {
    console.log("In imageOne effect");
    function updateImagesOne() {
      console.log("Transition ended imageOneRow");
      //re-order the map
      if (imageOneRowRight === 0) {
        console.log("in if imageOneRowRight");
        const newImagesRowTwo = imagesTwo.slice();
        const firstImgRowTwo = newImagesRowTwo.shift();
        newImagesRowTwo.push(firstImgRowTwo);
        setImagesTwo(newImagesRowTwo);
        setImageTwoRowRight(400);
        setActiveImageRow(2);

        //Above needs to be completed before the below runs
        setImageOneRowRight(400);
        const newImagesRowOne = imagesOne.slice();
        const firstImgRowOne = newImagesRowOne.shift();
        newImagesRowOne.push(firstImgRowOne);
        setImagesOne(newImagesRowOne);
      }
    }
    const transition = document.querySelector("#image-row-1");
    transition && transition.addEventListener("transitionend", updateImagesOne);

    return () =>
      transition?.removeEventListener("transitionend", updateImagesOne);
  }, [imageOneRowRight, imagesOne, imagesTwo]);

  //To do: Extract duplicate code
  useEffect(() => {
    console.log("In imageTwo effect");
    function updateImagesTwo() {
      console.log("Transition ended imageTwoRow");
      //re-order the map
      if (imageTwoRowRight === 0) {
        console.log("in if imageTwoRowRight");

        const newImagesRowOne = imagesOne.slice(); //think this is the bit that needs -200
        const firstImgRowOne = newImagesRowOne.shift();
        newImagesRowOne.push(firstImgRowOne);
        setImagesOne(newImagesRowOne);
        setImageOneRowRight(400);
        setActiveImageRow(1);

        //Above needs to be completed before the below runs
        setImageTwoRowRight(400);
        const newImagesRowTwo = imagesTwo.slice();

        const firstImgRowTwo = newImagesRowTwo.shift();
        newImagesRowTwo.push(firstImgRowTwo);
        setImagesTwo(newImagesRowTwo);
      }
    }
    const transition = document.querySelector("#image-row-2");
    transition && transition.addEventListener("transitionend", updateImagesTwo);
    return () =>
      transition?.removeEventListener("transitionend", updateImagesTwo);
  }, [imageTwoRowRight, imagesOne, imagesTwo]);

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
              transition: "width 1s ease-out",
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
              transition: "width 1s ease-out",
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
              transition: "right 1s ease-out",
              position: "absolute",
              //right: "400px", //decreasing the value 'right' moves the Images from left to right
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
              transition: "right 1s ease-out",
              position: "absolute",
              //right: "400px", //decreasing the value 'right' moves the Images from left to right
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
