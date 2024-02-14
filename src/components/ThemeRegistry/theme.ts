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
  /*
   *** Motivation***: MUI theme is not available in server components. So theme.breakpoints... will not work.
   */
  // This allows us to use custom breakpoints with sx. See "my-custom-breakoint below"
  // sx={{
  //   display: 'flex',
  //   flexDirection: { xs: 'column', <my-custom-breakpint>: 'row' },
  breakpoints: {
    values: {
      xs: 0,
      "350c": 350, //Using 350 as a key does not work.
      "430c": 430,
      sm: 600,
      "630c": 630,
      "715c": 712,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    body15: {
      fontSize: "0.9375rem",
      fontWeight: 400,
      lineHeight: 1.43,
    },
    body18: {
      fontSize: "1.125rem",
      fontWeight: 400,
      lineHeight: 1.43,
    },
  },
});

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    "350c": true;
    "430c": true;
    "630c": true;
    "715c": true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    body15: React.CSSProperties;
    body18: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body15?: React.CSSProperties;
    body18?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body15: true;
    body18: true;
  }
}

export default theme;
