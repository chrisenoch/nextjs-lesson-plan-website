import { Box } from "@mui/material";

/**
 * Useful for when the section you navigate to via a url link segment (e.g. #title) ends up hidden behind some other element.
 * This may happen because by default, the element you navigate to will be displayed at the very top of the page,
 * which may end up hidden behind another element (e.g. a navigation bar).
 *
 * FloatingId just moves the id you want to navigate to above or below
 * its parent element so that its parent element (the section you want to navigate to) displays in the desired part of the page.
 *
 * @param props
 * @param  props.positionValues - the position of the FloatingId relative to the nearest positioned parent element.
 * @param props.id - the id of the section you want to navigate to via a url segment
 * @returns
 */
export default function FloatingId({
  positionValues = {
    top: "-100px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  },
  id,
}: {
  id: string;
  positionValues?: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
}) {
  return (
    <Box
      id={id}
      position="absolute"
      component="span"
      sx={{
        zIndex: -1500,
        top: positionValues.top,
        right: positionValues.right,
        bottom: positionValues.bottom,
        left: positionValues.left,
      }}
    />
  );
}
