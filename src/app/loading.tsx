"use client";

import LoadingSpinner from "@/components/Presentation/LoadingSpinner";
import { Box } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: { xs: 2, "430x": 4, sm: 8 },
      }}>
      <LoadingSpinner
        sxSpinner={{
          height: { xs: "200px", "430c": "300px", sm: "400px" },
          width: { xs: "200px", "430c": "300px", sm: "400px" },
        }}
      />
    </Box>
  );
}
