"use client";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Image from "next/image";

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

export function Carousel() {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  //   const renderedimages = images.map((step, index) => (
  //     <div key={step.label}>
  //       <Box
  //         component="img"
  //         sx={{
  //           height: 255,
  //           display: "block",
  //           maxWidth: 400,
  //           overflow: "hidden",
  //           width: "100%",
  //         }}
  //         src={step.imgPath}
  //         alt={step.label}
  //       />
  //     </div>
  //   ));

  const [imageRowRight, setImageRowRight] = useState<number>(800);
  const [firstImageWidth, setFirstImageWidth] = useState<number>(0);

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
              //right: "800px", //decreasing the value 'right' moves the Images from left to right
              right: `${imageRowRight}px`,
            }}>
            <Image
              alt={"beach"}
              src={
                "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg"
              }
              width={`${firstImageWidth}`}
              height={200}
              style={{
                maxWidth: "100%",
                transition: "width 1s ease-out",
              }}
              priority
            />

            <Image
              alt={"beach"}
              src={
                "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg"
              }
              width={200}
              height={200}
              priority
            />
            <Image
              alt={"driverless-cars"}
              src={
                "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg"
              }
              width={200}
              height={200}
              style={{
                //marginLeft: "200px",
                //marginRight: "200px",
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
                //borderRadius: 32,
              }}
            />
            <Image
              alt={"shopping"}
              src={
                "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg"
              }
              width={200}
              height={200}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
                //borderRadius: 32,
              }}
            />
            <Image
              alt={"beach"}
              src={
                "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg"
              }
              width={200}
              height={200}
              priority
            />
            <Image
              alt={"driverless-cars"}
              src={
                "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg"
              }
              width={200}
              height={200}
              style={{
                //marginLeft: "200px",
                marginRight: "200px",
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
                //borderRadius: 32,
              }}
            />
          </Stack>
        </Box>
      </Stack>
      <Stack direction={"row"}>
        <Button
          onClick={() => setImageRowRight((px) => px + 200)}
          color="secondary"
          variant="outlined">
          Move slide right
        </Button>
        <Button
          onClick={() => setImageRowRight((px) => px - 200)}
          variant="outlined">
          Move slide right
        </Button>
        <Button
          onClick={() => setFirstImageWidth((px) => px + 200)}
          variant="outlined">
          Change width of first image
        </Button>
      </Stack>
    </>
  );
}
