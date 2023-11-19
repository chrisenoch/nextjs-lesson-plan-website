import { Stack, Typography } from "@mui/material";

export default function SearchLessonPlans({ children }) {
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
