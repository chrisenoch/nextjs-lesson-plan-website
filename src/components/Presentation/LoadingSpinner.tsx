import { Box, styled } from "@mui/material";
import ColorFactory from "../Utils/ColorFactory";
import { orange, pink, purple } from "@mui/material/colors";
import { FaCog, FaCloud } from "react-icons/fa";

export default function LoadingSpinner() {
  const FaCogStyled = styled(FaCog, {
    name: "MuiPath", // The component name
    slot: "root", // The slot name
  })({});

  const FaCloudStyled = styled(FaCloud, {
    name: "MuiPath", // The component name
    slot: "root", // The slot name
  })({});

  return (
    <Box position="relative" height="400px" width="400px">
      <Box
        sx={{
          zIndex: 2001,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
        <FaCogStyled
          sx={{
            height: "400px",
            width: "400px",
            animation:
              "spin 7s linear infinite,change-color 3s linear infinite",

            "@keyframes spin": {
              from: {
                transform: "rotate(0deg)",
              },
              to: {
                transform: "rotate(360deg)",
              },
            },
            "@keyframes change-color": {
              "0%": {
                color: purple[100],
                opacity: "50%",
              },

              "50%": {
                color: pink[100],
                opacity: "50%",
              },

              "100%": {
                color: purple[100],
                opacity: "50%",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
