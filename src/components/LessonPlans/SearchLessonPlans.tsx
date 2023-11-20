import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function SearchLessonPlans({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Stack
      spacing={4}
      sx={{
        maxWidth: "900px",
        mt: 10,
        mb: 4,
        mx: "auto",
      }}>
      <Typography
        variant="h4"
        component="h3"
        borderBottom={4}
        borderColor={"primary.light"}
        alignSelf={"center"}>
        Search lesson plans
      </Typography>

      {children}
    </Stack>
  );
}
