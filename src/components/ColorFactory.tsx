"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

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
