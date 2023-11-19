import { Stack, Typography } from "@mui/material";
import AutoCompleteMultiSelect from "../AutoCompleteMultiSelect";

export default function SearchLessonPlans() {
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

      <AutoCompleteMultiSelect />
    </Stack>
  );
}
