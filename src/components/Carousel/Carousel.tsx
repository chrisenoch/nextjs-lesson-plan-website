"use client";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
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

  const [images, setImages] = useState<any[]>(imagesArr);

  const [imageRowRight, setImageRowRight] = useState<number>(400);
  const [firstImageWidth, setFirstImageWidth] = useState<number>(0);
  const [leftBoxWidth, setLeftBoxWidth] = useState<number>(0);
  const [rightBoxWidth, setRightBoxWidth] = useState<number>(0);

  function moveRight() {
    //To do: Check possible bug:May not render in the order I hope.
    setFirstImageWidth((px) => px + 200);
    const newImages = images.slice();
    const lastImg = newImages.pop();
    newImages.unshift(lastImg);
    setImages(newImages);
  }

  function moveLeft() {
    setFirstImageWidth((px) => px - 200);
    const newImages = images.slice();
    const firstImg = newImages.shift();
    newImages.push(firstImg);
    setImages(newImages);
  }

  //Need to increase width and then when finished run map
  //flush sync
  //have map in Effect and depend on transitionEnd variable?

  // Move right: 1. increase width to 200 of first element, decreasewidth to 0 of last element, so it is already zero when gets put in the map.
  // need lastImageWidth state for this.
  // when finished add to map. First image needs to have 0 before renders

  //I'm setting it as position in array, but probably should be set by id.

  //To improve: Don't do transition on image width. must be costly. Insert a div before and after last images and increase and decrease this

  const renderedimages = images.map((image, index, arr) => {
    //const imgWidth = index === 0 ? 0 : 200;
    console.log("map runs");
    return (
      <Image
        key={image.alt}
        alt={image.alt}
        src={image.imgPath}
        //width={index === 0 ? firstImageWidth : 200}
        width={200}
        height={200}
        style={{
          maxWidth: "100%",
          transition: "width 1s ease-out",
        }}
        priority
      />
    );
  });

  renderedimages.unshift(
    <Box
      key="push-images-to-right"
      height="200px"
      width={leftBoxWidth}
      //width={200}
      //width="200px"
      sx={{
        transition: "width .8s ease-out",
        flexShrink: 0,
      }}></Box>
  );

  renderedimages.push(
    <Box
      key="push-images-to-left"
      height="200px"
      width={rightBoxWidth}
      sx={{
        transition: "width .8s ease-out",
        flexShrink: 0,
      }}></Box>
  );

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
            id="image-row"
            sx={{
              width: "200px",
              height: "200px",
              backgroundColor: "gray",
              transition: "right 1s ease-out",
              position: "absolute",
              right: "200px", //decreasing the value 'right' moves the Images from left to right
              //right: `${imageRowRight}px`,
            }}>
            {renderedimages}
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
        <Button onClick={() => setLeftBoxWidth(200)} variant="outlined">
          Increase width of left box
        </Button>
        <Button onClick={() => setLeftBoxWidth(0)} variant="outlined">
          Decrease width of left box
        </Button>
        <Button onClick={() => setRightBoxWidth(200)} variant="outlined">
          Increase width of right box
        </Button>
        <Button onClick={() => setRightBoxWidth(0)} variant="outlined">
          Decrease width of right box
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
