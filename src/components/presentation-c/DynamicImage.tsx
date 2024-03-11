"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function CurvedUnderlineTitle() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageWrapperBackground, setImageWrapperBackground] =
    useState<string>("#e2e8f0");
  const [imageVisibility, setImageVisibility] = useState<"hidden" | "visible">(
    "hidden"
  );

  return (
    <Box
      display="inline-block"
      height="100%"
      width="100%"
      sx={{
        backgroundColor: imageWrapperBackground,
      }}>
      <Image
        onLoad={(img) => {
          console.log("loading complete");
          setImageWrapperBackground("transparent");
          setImageVisibility("visible");
        }}
        ref={imageRef}
        alt="Driverless Cars"
        src="https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg"
        width={640}
        height={480}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          visibility: imageVisibility,
        }}
      />
    </Box>
  );
}
