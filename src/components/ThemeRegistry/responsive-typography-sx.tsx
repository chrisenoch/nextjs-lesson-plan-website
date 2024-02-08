import { Theme } from "@mui/material";

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
  responsiveVariants: ResponsiveTypographyVariants,
  theme: Theme
) {
  const typography: { [key: string]: any } = {
    h1: theme.typography.h1,
    h2: theme.typography.h2,
    h3: theme.typography.h3,
    h4: theme.typography.h4,
    h5: theme.typography.h5,
    h6: theme.typography.h6,
    body1: theme.typography.body1,
    body2: theme.typography.body2,
    body15: { ...theme.typography.body2, fontSize: "0.9375rem" },
    body18: { ...theme.typography.body2, fontSize: "1.125rem" },
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

export type ResponsiveTypographyVariants = { [key: string]: TypographyKeys };
type cssPropsObj = Record<TypographyCSSProp, any>;

export type TypographyKeys =
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
