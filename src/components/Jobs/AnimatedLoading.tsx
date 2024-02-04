import { Box } from "@mui/material";
import ColorFactory from "../Utils/ColorFactory";
import { purple } from "@mui/material/colors";

export default function AnimatedLoading() {
  return (
    <ColorFactory primary={purple[50]}>
      <Box position="relative" height="400px" width="400px">
        <Box
          height="400px"
          width="400px"
          sx={{
            zIndex: 2000,
            position: "absolute",
            backgroundColor: "primary.main",
            borderRadius: "30%",
            animation: "spin 5s linear infinite",
            "@keyframes spin": {
              from: {
                transform: "rotate(0deg)",
              },
              to: {
                transform: "rotate(360deg)",
              },
            },
          }}></Box>
        <Box
          sx={{
            zIndex: 2001,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}>
          <Box
            sx={{
              fontSize: "40px",
            }}>
            Loading
          </Box>
        </Box>
      </Box>
    </ColorFactory>
  );
}
