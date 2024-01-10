import { AddJob } from "@/components/Jobs/AddJob";
import { Stack } from "@mui/material";

export default function JobsPage() {
  return (
    <Stack
      spacing={2}
      maxWidth={"1200px"}
      mx={"auto"}
      marginTop={2}
      marginBottom={2}>
      <AddJob />
    </Stack>
  );
}