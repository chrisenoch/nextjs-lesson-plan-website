import { setSXValues } from "@/component-functions/set-sx-values";
import { Box, SxProps, Theme, styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import { FaCog } from "react-icons/fa";

export default function LoadingSpinner({
  sxSpinner,
}: {
  sxSpinner?: SxProps<Theme>;
}) {
  const sxSpinnerDefault: SxProps<Theme> = {
    height: "300px",
    width: "300px",
    color: purple[100],
    opacity: "50%",
    animation: "spin 7s linear infinite",
    "@keyframes spin": {
      from: {
        transform: "rotate(0deg)",
      },
      to: {
        transform: "rotate(360deg)",
      },
    },
  };

  const { sxSpinnerFinal } = setSXValues([
    {
      userValues: sxSpinner,
      defaultValues: sxSpinnerDefault,
      sxName: "Spinner",
    },
  ]);

  return (
    <Box position="relative" height="300px" width="300px">
      <Box
        sx={{
          zIndex: 2001,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
        <FaCogStyled sx={sxSpinnerFinal} />
      </Box>
    </Box>
  );
}

const FaCogStyled = styled(FaCog, {
  name: "MuiPath", // The component name
  slot: "root", // The slot name
})({});
