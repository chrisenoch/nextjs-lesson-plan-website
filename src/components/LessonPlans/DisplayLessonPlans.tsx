import { Box, Grid } from "@mui/material";
import LessonPlanCard from "./LessonPlanCard";
import { LessonPlanType } from "../models/types/LessonPlanCategoryShort";
import { LessonPlan } from "../models/types/LessonPlan";

export default function DisplayLessonplans({
  lessonPlans,
}: {
  lessonPlans: LessonPlan[];
}) {
  const lessonPlansToDisplay = lessonPlans.map((lessonPlan) => (
    <Grid item xs={4} key={lessonPlan.title}>
      <LessonPlanCard
        title={lessonPlan.title}
        imageURL={lessonPlan.imageURL}
        imageAlt={lessonPlan.imageAlt}
        description={lessonPlan.description}
        chips={lessonPlan.chips}
      />
    </Grid>
  ));

  return (
    <Box
      sx={{
        // height: "100%",
        display: "flex",
        maxWidth: "1200px",
        margin: "0 auto",
        // width: "100%",
      }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {lessonPlansToDisplay}
      </Grid>
    </Box>
  );
}
