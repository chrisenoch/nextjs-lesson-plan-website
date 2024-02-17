import { Theme } from "@mui/material";
import muiTheme from "./theme";

/**
 * Useful if you wish to use different MUI Typography variants (h1, h2, etc) at different media breakpoints.
 * The UI jumps if we use useMediaQuery due to SSR in Next.js. However, using the sx prop for media queries does seem to work.
 * @example
 * //A possible argument for responsiveVariants:
 * const responsiveVariants = {
 *    xs: "h4",
 *    md: "h2",
 *    lg: "h1"
 *    };
 * //... would return the following values which can be added to the sx prop:
 * {
 *   "fontWeight": {
 *       "xs": "400",
 *       "md": "400",
 *       "lg": 300
 *   },
 *   "fontSize": {
 *       "xs": "2.125rem",
 *       "md": "3rem",
 *       "lg": "3.75rem"
 *   },
 *   "lineHeight": {
 *       "xs": "1.235",
 *       "md": "1.167",
 *       "lg": 1.2
 *   },
 *   "letterSpacing": {
 *       "xs": "0.00735em",
 *       "md": "0em",
 *       "lg": "-0.00833em"
 *   }
 * }
 *
 * @param responsiveVariants
 * @param theme
 * @returns The MUI sx props object to be added to the sx prop of the MUI component /component that wraps a MUI component
 */
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
