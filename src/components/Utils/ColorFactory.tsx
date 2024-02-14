"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

/**
 * Wraps a MUI component and provides a custom primary colour, which can be used as the color prop.
 * This allows us to take advantage of MUI's great functionality for the color prop. We could define a new colour at theme level, but
 * you need to add the color property to the type of every individual component for every custom colour. 
 * @see{@link https://mui.com/material-ui/customization/palette |MUI module augmentation for the button color prop.} 
 * ColorFactory allows us
 * to use a custom color as the color prop for any component instantly, on-the-fly and with zero boilerplate.
 * @param param0 
 * @summary
 * To customise a button we could change the color and backgroundColor properties. But then we need to think about hover state, focus state, text color, etc.
 * This funtion allows all of these to be generated automatically.
 * @example
 * <ColorFactory primary="#FFFFFF">
    <IconButton
      color="primary"
      size="large"
      onClick={() => emit(carouselMoveLeft)}>
      <ArrowBackIos />
    </IconButton>
  </ColorFactory>
 * @returns 
 */
export default function ColorFactory({
  primary,
  children,
}: {
  primary: string;
  children: ReactNode;
}) {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: primary,
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
