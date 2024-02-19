"use client";
import { Box, Stack } from "@mui/material";
import { useState } from "react";

export default function PremiumPage() {
  const [num, setNum] = useState<number>(0);

  console.log("premium renders");
  //Some content added
  return (
    <Stack
      spacing={2}
      maxWidth={"1200px"}
      mx={"auto"}
      marginTop={2}
      marginBottom={2}>
      <p>This is the premium area!</p>
      <p>Number: {num}</p>

      <button onClick={() => setNum((c) => c + 1)}>Increase number</button>
    </Stack>
  );
}
