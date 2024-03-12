"use client";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";
export default function SkeletonImage({
  src,
  alt,
  renderedWidth,
  renderedHeight,
}: {
  src: string;
  alt: string;
  renderedWidth: number;
  renderedHeight: number;
}) {
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
        alt={alt}
        src={src}
        width={renderedWidth}
        height={renderedHeight}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          visibility: imageVisibility,
        }}
      />
    </Skeleton>
  );
}
