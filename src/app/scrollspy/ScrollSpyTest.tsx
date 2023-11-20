"use client";

import useIntersectionObserver from "@/customHooks/useIntersectionObserver";
import { Box, Stack, Typography } from "@mui/material";

export default function ScrolLSpyTest() {
  const isInterSecting = useIntersectionObserver("0px 0px -80% 0px", "#bop");
  console.log("isIntersecting: " + isInterSecting);

  return (
    <Stack alignItems={"center"}>
      <Box mb={100}>I have lots of bottom margin</Box>
      <Box mb={100} bgcolor={"primary.light"}>
        <Typography id="foo" gutterBottom variant="h2" component="h2">
          Hello from ScrollSpyTest
        </Typography>
      </Box>
      <Box mb={100} bgcolor={"secondary.light"}>
        <Typography id="bar" gutterBottom variant="h2" component="h2">
          Hello from ScrollSpyTest
        </Typography>
      </Box>
      <Box mb={100} bgcolor={"success.light"}>
        <Typography id="bazz" gutterBottom variant="h2" component="h2">
          Hello from ScrollSpyTest
        </Typography>
      </Box>
      <Box mb={100} bgcolor={!isInterSecting ? "info.light" : "primary.main"}>
        <Typography id="bop" gutterBottom variant="h2" component="h2">
          Hello from ScrollSpyTest
        </Typography>
      </Box>
    </Stack>
  );
}
