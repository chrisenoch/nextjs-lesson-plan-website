import { Box } from "@mui/material";

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
        top: positionValues.top,
        right: positionValues.right,
        bottom: positionValues.bottom,
        left: positionValues.left,
      }}
    />
  );
}
