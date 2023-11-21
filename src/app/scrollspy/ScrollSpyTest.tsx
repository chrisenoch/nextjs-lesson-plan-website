"use client";

import useScrollSpy from "@/customHooks/useScrollSpy";
import ScrollSpyTest2 from "./ScrollSpyTest2";

export default function ScrolLSpyTest() {
  console.log("ScrollSpyTest rendered");
  const interceptorId = useScrollSpy(["#bazz", "#bop"]);
  // const isBopIntersecting = useIntersectionObserver("#bop", {
  //   mt: "0px",
  //   mr: "0px",
  //   mb: "-50%",
  //   ml: "0px",
  // });

  console.log("interceptors id: ");
  console.log(interceptorId);

  return (
    <ScrollSpyTest2 isBazzIntersecting={true} isBopIntersecting={true} />
    // <Stack alignItems={"center"}>
    //   <Box mb={100}>I have lots of bottom margin</Box>
    //   <Box mb={100} bgcolor={"primary.light"}>
    //     <Typography id="foo" gutterBottom variant="h2" component="h2">
    //       Hello from ScrollSpyTest
    //     </Typography>
    //   </Box>
    //   <Box mb={100} bgcolor={"secondary.light"}>
    //     <Typography id="bar" gutterBottom variant="h2" component="h2">
    //       Hello from ScrollSpyTest
    //     </Typography>
    //   </Box>
    //   <Box
    //     mb={100}
    //     bgcolor={!isBazzIntersecting ? "success.light" : "warning.main"}>
    //     <Typography id="bazz" gutterBottom variant="h2" component="h2">
    //       Hello from ScrollSpyTest
    //     </Typography>
    //   </Box>
    //   <Box
    //     mb={100}
    //     bgcolor={!isBopIntersecting ? "info.light" : "primary.main"}>
    //     <Typography id="bop" gutterBottom variant="h2" component="h2">
    //       Hello from ScrollSpyTest
    //     </Typography>
    //   </Box>
    // </Stack>
  );
}
