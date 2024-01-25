"use client";

import { ThemeProvider, createTheme } from "@mui/material";

export default function ColorFactory(props: any) {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: props.primary,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {props?.children}
      {/* <props.comp {...props}>{props?.children}</props.comp> */}
    </ThemeProvider>
  );
}
