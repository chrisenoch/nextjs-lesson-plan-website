import { Stack, Box, Typography } from "@mui/material";

export default function ScrollSpyTest2({
  isBazzIntersecting,
  isBopIntersecting,
}: {
  isBazzIntersecting: boolean;
  isBopIntersecting: boolean;
}) {
  return (
    <Stack alignItems={"center"}>
      <Box mb={100}>I have lots of bottom margin</Box>
      <Box mb={100} bgcolor={"primary.light"}>
        <Typography id="foo" gutterBottom variant="h2" component="h2">
          Hello from Foo
        </Typography>
      </Box>
      <Box mb={100} bgcolor={"secondary.light"}>
        <Typography id="bar" gutterBottom variant="h2" component="h2">
          Hello from Bar
        </Typography>
      </Box>
      <Box
        mb={100}
        bgcolor={!isBazzIntersecting ? "success.light" : "warning.main"}>
        <Typography id="bazz" gutterBottom variant="h2" component="h2">
          Hello from Bazz
        </Typography>
      </Box>
      <Box
        mb={100}
        bgcolor={!isBopIntersecting ? "info.light" : "primary.main"}>
        <Typography id="bop" gutterBottom variant="h2" component="h2">
          Hello from Bop
        </Typography>
      </Box>
    </Stack>
  );
}
