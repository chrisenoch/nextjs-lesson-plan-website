import { SxProps, Theme } from "@mui/material";

export type ImageDisplayBoxExcludedKeys = "width" | "height";
export type ImageDisplayBox =
  | SxProps<Theme> & {
      [K in ImageDisplayBoxExcludedKeys]?: never;
    };

export type ImageRowExcludedKeys =
  | "width"
  | "height"
  | "display"
  | "transition"
  | "right";
export type ImageRow =
  | SxProps<Theme> & {
      [K in ImageRowExcludedKeys]?: never;
    };
