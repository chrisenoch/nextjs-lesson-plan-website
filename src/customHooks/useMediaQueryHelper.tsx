import { useMediaQuery } from "@mui/material";

type Media = "matches0Up" | "matches630Up" | "matches900Up" | "matches1200Up";
/**
 * Get your desired argument to the variant of an MUI component at a specific breakpoint.
 * @example
 * 'Here, between 0 and 630px, the string value 'h4' will become the value of titleVariant, which will then become the Typography variant in the component below '
 * const { titleVariant, titleTextVariant } = useMediaQueryhelper({
    titleVariant: [
      { h4: "matches0Up" },
      { h3: "matches630Up" },
      { h2: "matches1200Up" },
    ],
    titleTextVariant: [{ body1: "matches0Up" }, { h6: "matches900Up" }],
  });
  <Typography variant={titleVariant} component="p">some text... </Typography>
 * @param valueObjectsByPropertyName 
 * @returns an object with the variants that matches the media breakpoint out of the ones you specified, or an empty object upon no media query matches.
 * If you destructure the property names in the calling component (e.g. const { titleVariant, titleTextVariant } = useMediaQueryhelper)), the variables will be undefined upon no media match.
 * @example
 * 'Example return value':
 * {
    "titleVariant": "h3",
    "titleTextVariant": "h6"
   }
 * 
 * 
 */
export default function useMediaQueryHelper(valueObjectsByPropertyName: {
  [key: string]: { [key: string]: Media }[];
}) {
  const matches0Up = useMediaQuery("(min-width:0px)");
  const matches630Up = useMediaQuery("(min-width:630px)");
  const matches900Up = useMediaQuery("(min-width:900px)");
  const matches1200Up = useMediaQuery("(min-width:1200px)");

  const media = {
    matches0Up,
    matches630Up,
    matches900Up,
    matches1200Up,
  };

  //I could improve this but I have other prriorities because useMediaQuery does not work with SSR so I will not use this hook.
  const variants: any = {};
  Object.entries(valueObjectsByPropertyName).forEach(
    ([propertyName, mediaQueriesByVariant]) => {
      for (let i = 0; i < mediaQueriesByVariant.length; i++) {
        const mediaQueryByVariant = mediaQueriesByVariant[i];
        const variant = Object.keys(mediaQueryByVariant)[0];
        const matchingMediaQuery = Object.values(mediaQueryByVariant)[0];
        const isMatch = media[matchingMediaQuery];
        if (isMatch) {
          variants[propertyName] = variant;
        }
      }
    }
  );
  return variants;
}
