"use client";

import LoadingSpinner from "@/components/Presentation/LoadingSpinner";
import { Box } from "@mui/material";

export default function Loading() {
  return (
    <Box display="flex" justifyContent={"center"}>
      <LoadingSpinner />
    </Box>
  );
}
