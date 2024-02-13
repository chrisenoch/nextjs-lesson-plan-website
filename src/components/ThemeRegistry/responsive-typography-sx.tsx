import { Theme } from "@mui/material";
import muiTheme from "./theme";
import { CSSProperties } from "@mui/material/styles/createTypography";

// I want to use custom breakpoints and change the Typography variant with the sx prop according to screen width.
// The UI jumps if I use useMediaQuery

//Example argument:
// const responsiveVariants = {
//   xs: "h4",
//   "630c": "h2",
//   lg: "h1",
// };
//Example return value, which can be passed to the sx prop.
// {
//   "fontWeight": {
//       "xs": "400",
//       "630c": "400",
//       "lg": 300
//   },
//   "fontSize": {
//       "xs": "2.125rem",
//       "630c": "3rem",
//       "lg": "3.75rem"
//   },
//   "lineHeight": {
//       "xs": "1.235",
//       "630c": "1.167",
//       "lg": 1.2
//   },
//   "letterSpacing": {
//       "xs": "0.00735em",
//       "630c": "0em",
//       "lg": "-0.00833em"
//   }
// }
export function getTypographyVariantSX(
  responsiveVariants: MediaQueryByTypographyVariant,
  theme?: Theme
) {
  let finalTheme;
  if (theme) {
    finalTheme = theme;
  } else {
    finalTheme = muiTheme;
  }

  const typography: TypographyVariantByCSSProps = {
    h1: finalTheme.typography.h1,
    h2: finalTheme.typography.h2,
    h3: finalTheme.typography.h3,
    h4: finalTheme.typography.h4,
    h5: finalTheme.typography.h5,
    h6: finalTheme.typography.h6,
    body1: finalTheme.typography.body1,
    body2: finalTheme.typography.body2,
    body15: finalTheme.typography.body15,
    body18: finalTheme.typography.body18,
  };

  const typographySX: cssPropsObj = {
    fontWeight: undefined,
    fontSize: undefined,
    lineHeight: undefined,
    letterSpacing: undefined,
  };

  Object.keys(typographySX).forEach((typographySXCssProp) => {
    const breakPointsByTypography: any = {};
    Object.entries(responsiveVariants).forEach(
      ([breakpoint, typographyValue]) => {
        breakPointsByTypography[breakpoint] =
          typography[typographyValue][typographySXCssProp];
      }
    );
    const typographySXCssPropFinal = typographySXCssProp as TypographyCSSProp;
    typographySX[typographySXCssPropFinal] = breakPointsByTypography;
  });

  return typographySX;
}

export type MediaQueryByTypographyVariant = { [key: string]: TypographyKey };
type cssPropsObj = Record<TypographyCSSProp, any>;
type TypographyVariantByCSSProps = Record<TypographyKey, any>;
export type TypographyKey =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "body15"
  | "body18";

type TypographyCSSProp =
  | "fontWeight"
  | "fontSize"
  | "lineHeight"
  | "letterSpacing";
