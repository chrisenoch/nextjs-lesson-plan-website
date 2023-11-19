"use client";

import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Chip, ThemeProvider, createTheme } from "@mui/material";

export default function CustomChip(props: any) {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: props.primary,
      },
      secondary: {
        main: "#2196f3",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <props.comp {...props} />
    </ThemeProvider>
  );
}
