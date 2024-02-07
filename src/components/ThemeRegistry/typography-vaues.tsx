// I want to use custom breakpoints and reference the theme values with the sx prop. I can't
// figure out how to do this.
// E.g. The below does not work:
// sx={(theme) => ({
//     [theme.breakpoints.up(630)]: { //custom breakpoint
//       fontSize: theme.typography.h4
//     },
//     [theme.breakpoints.up(900)]: { //Also, does not work if I change 900 to 'md'
//       // fontSize: theme.typography.h2,
//       fontSize: theme.typography.h3
//     },

//     Below does not work
//     // fontSize: {
//     //   xs: theme.typography.h4,
//     //   lg: theme.typography.h2,
//     // },

//Example argument:
// const responsiveVariants = {
//   xs: "h4",
//   "630c": "h2",
//   lg: "h1",
// };
export function getTypographyVariantSX(
  responsiveVariants: ResponsiveTypographyVariants
) {
  type cssPropsObj = Record<TypographyCSSProp, any>;

  const typographySX: cssPropsObj = {
    fontWeight: undefined,
    fontSize: undefined,
    lineHeight: undefined,
    letterSpacing: undefined,
  };

  Object.keys(typographySX).forEach((starterCssProp) => {
    const breakPointsByTypography: any = {};
    Object.entries(responsiveVariants).forEach(
      ([breakpoint, typographyValue]) => {
        breakPointsByTypography[breakpoint] =
          typography[typographyValue][starterCssProp];
      }
    );
    const starterCssPropFinal = starterCssProp as TypographyCSSProp;
    typographySX[starterCssPropFinal] = breakPointsByTypography;
  });

  return typographySX;
}

export const h1 = {
  fontWeight: 300,
  fontSize: "6rem",
  lineHeight: 1.167,
  letterSpacing: "-0.01562em",
};
export const h2 = {
  fontWeight: 300,
  fontSize: "3.75rem",
  lineHeight: 1.2,
  letterSpacing: "-0.00833em",
};

export const h3 = {
  fontWeight: "400",
  fontSize: "3rem",
  lineHeight: "1.167",
  letterSpacing: "0em",
};

export const h4 = {
  fontWeight: "400",
  fontSize: "2.125rem",
  lineHeight: "1.235",
  letterSpacing: "0.00735em",
};

export const h5 = {
  fontWeight: "400",
  fontSize: "1.5rem",
  lineHeight: "1.334",
  letterSpacing: "0em",
};

export const h6 = {
  fontWeight: "500",
  fontSize: "1.25rem",
  lineHeight: "1.6",
  letterSpacing: "0.0075em",
};

export const body1 = {
  fontWeight: "400",
  fontSize: "1rem",
  lineHeight: "1.5",
  letterSpacing: "0.00938em",
};

export const body2 = {
  fontWeight: "400",
  fontSize: "0.875rem",
  lineHeight: "1.43",
  letterSpacing: "0.01071em",
};

export type ResponsiveTypographyVariants = { [key: string]: TypographyKeys };

export type TypographyKeys =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2";

const typography: { [key: string]: any } = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  body1,
  body2,
};

type TypographyCSSProp =
  | "fontWeight"
  | "fontSize"
  | "lineHeight"
  | "letterSpacing";
