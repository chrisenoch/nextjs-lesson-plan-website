"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

/**
 * Wraps a MUI component and provides a custom primary colour, which can be used as the color prop.
 * We take advantage of MUI's functionality for the color prop. We could define a new colour at theme level, but
 * you need to add the color property to the type of every individual component for every custom colour. 
 * @see{@link https://mui.com/material-ui/customization/palette |MUI module augmentation for the button color prop.} 
 * ColorFactory allows us
 * to use a custom color as the color prop for any component instantly, on-the-fly and with zero boilerplate.
 * @param {Object} props 
 * @param {string} props.primary - The colour you wish to use for the color prop of the nested component/components 
 * @param {string} props.children - The MUI component/components you wish the colour defined in props.primary to apply to. 
 * IMPORTANT: color=secondary will not work. Only use color=primary on components nested in ColorFactory. If you wish to use primary and secondary, use createTheme.
 * @summary
 * To customise a button we could change the color and backgroundColor properties. But then we need to think about hover state, focus state, text color, etc.
 * This funtion allows all of these to be generated automatically.
 * @example
 * <ColorFactory primary="#FFFFFF">
    <IconButton
      color="primary" //Only primary is valid here. Do not use secondary.
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
