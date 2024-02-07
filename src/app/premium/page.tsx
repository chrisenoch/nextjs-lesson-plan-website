"use client";
import { Box, Stack } from "@mui/material";
import { useState } from "react";

export default function PremiumPage() {
  const [num, setNum] = useState<number>(0);

  console.log("premium renders");
  return (
    <Stack
      spacing={2}
      maxWidth={"1200px"}
      mx={"auto"}
      marginTop={2}
      marginBottom={2}>
      <p>This is the premium area!</p>
      <button onClick={() => setNum((c) => c + 1)}>Set Num</button>
      {/* <Box // test custom breakpoints
        sx={{
          width: "100%",
          height: 8,
          display: {
            "3sm": "block",
            "2sm": "block", //430,
            sm: "none", //600
            md: "block",
            lg: "none",
          }, //also try with
          backgroundColor: {
            xs: "primary.main",
            "3sm": "success.main", //350,
            "2sm": "warning.main", //430,
            sm: "secondary.main", //600
            md: "error.main",
            lg: "warning.main",
          },
        }}></Box> */}
    </Stack>
  );
}
