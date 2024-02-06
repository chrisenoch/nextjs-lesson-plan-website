import { SxProps, Theme } from "@mui/material";

export type CarouselItemDisplayBoxExcludedKeys = "width" | "height";
export type CarouselItemDisplayBox =
  | SxProps<Theme> & {
      [K in CarouselItemDisplayBoxExcludedKeys]?: never;
    };

export type CarouselItemRowExcludedKeys =
  | "width"
  | "height"
  | "display"
  | "transition"
  | "right";
export type CarouselItemRow =
  | SxProps<Theme> & {
      [K in CarouselItemRowExcludedKeys]?: never;
    };
