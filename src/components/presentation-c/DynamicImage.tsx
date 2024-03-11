"use client";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";
export default function CurvedUnderlineTitle() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageVisibility, setImageVisibility] = useState<"hidden" | "visible">(
    "hidden"
  );

  const skeletonSXProps =
    imageVisibility === "hidden"
      ? {}
      : {
          animation: "none",
          backgroundColor: "transparent",
        };

  return (
    <Skeleton
      sx={{
        display: "inline-block",
        height: "100%",
        width: "100%",
        transform: "scale(1,1)",
        ...skeletonSXProps,
        maxWidth: "100%",
      }}>
      <Image
        onLoad={() => {
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
    </Skeleton>
  );

  //   return (
  //     <Box
  //       display="inline-block"
  //       height="100%"
  //       width="100%"
  //       sx={{
  //         backgroundColor: imageWrapperBackground,
  //       }}>
  //       <Image
  //         onLoad={(img) => {
  //           console.log("loading complete");
  //           setImageWrapperBackground("transparent");
  //           setImageVisibility("visible");
  //         }}
  //         ref={imageRef}
  //         alt="Driverless Cars"
  //         src="https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg"
  //         width={640}
  //         height={480}
  //         style={{
  //           height: "100%",
  //           width: "100%",
  //           objectFit: "cover",
  //           visibility: imageVisibility,
  //         }}
  //       />
  //     </Box>
  //   );
}
