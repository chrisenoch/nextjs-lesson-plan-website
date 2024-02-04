import CurvedUnderlineTitle from "@/components/Presentation/CurvedUnderline";
import { AllJobs } from "@/components/Jobs/AllJobs";
import { Stack } from "@mui/material";
import { orange } from "@mui/material/colors";

export default function JobsPage() {
  return (
    <Stack spacing={2} maxWidth={"1200px"} mx={"auto"} marginBottom={2}>
      <CurvedUnderlineTitle
        component={"h1"}
        variant={"h3"}
        title={"Jobs"}
        color={orange[300]}
        sxUnderline={{ left: 2, borderRadius: "30%" }}
        sxTypography={{
          marginBottom: "12px !important",
          alignSelf: "center",
        }}
      />
      <AllJobs />
    </Stack>
  );
}
