import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7e57c2",
    },
    secondary: {
      main: "#2196f3",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      "3sm": 350,
      "2sm": 430,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "2sm": true;
    "3sm": true;
  }
}

export default theme;
