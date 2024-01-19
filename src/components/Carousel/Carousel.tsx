"use client";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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

  function moveRight() {
    setImageRowRight((px) => px - 200);
  }
  function moveLeft() {
    setImageRowRight((px) => px + 200);
  }

  useEffect(() => {
    function updateImages() {
      console.log("Transition ended");

      //re-order the map
      // if (imageRowRight === 0) {
      //   console.log("in if");
      //   //move all elements except the first one to the start of the array
      //   const newImages = images.slice();
      //   const firstImg = newImages.pop();
      //   newImages.push(firstImg);
      //   setImages(newImages);
      //   setImageRowRight(0);
      // }
    }

    const transition = document.querySelector("#image-row");
    transition && transition.addEventListener("transitionend", updateImages);

    return () => transition?.removeEventListener("transitionend", updateImages);
  }, [imageRowRight, images]);

  //Just increase and decrease value of right. Always moves the images.
  //When value is 0, we need to:
  //Re-render the map and put the

  //Need to increase width and then when finished run map
  //flush sync
  //have map in Effect and depend on transitionEnd variable?

  // Move right: 1. increase width to 200 of first element, decreasewidth to 0 of last element, so it is already zero when gets put in the map.
  // need lastImageWidth state for this.
  // when finished add to map. First image needs to have 0 before renders
  //Move left:
  //I'm setting it as position in array, but probably should be set by id.
  //To improve: Don't do transition on image width. must be costly. Insert a div before and after last images and increase and decrease this

  const renderedimages = images.map((image, index, arr) => {
    //const imgWidth = index === 0 ? 0 : 200;

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
              //right: "400px", //decreasing the value 'right' moves the Images from left to right
              right: `${imageRowRight}px`,
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
