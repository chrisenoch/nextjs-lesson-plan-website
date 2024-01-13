import { Box, Grid } from "@mui/material";
import LessonPlanCard from "./LessonPlanCard";
import { LessonPlan } from "../../models/types/LessonPlan";

export default function DisplayLessonplans({
  lessonPlans,
}: {
  lessonPlans: LessonPlan[];
}) {
  console.log("lessonPlans in DisplayLessonPlans");
  console.log(lessonPlans);

  const lessonPlansToDisplay = lessonPlans.map((lessonPlan) => (
    <Grid item xs={4} key={lessonPlan.title}>
      <LessonPlanCard
        id={lessonPlan.id}
        title={lessonPlan.title}
        duration={lessonPlan.duration}
        prepTime={lessonPlan.prepTime}
        level={lessonPlan.level}
        description={lessonPlan.description}
        isPremium={lessonPlan.isPremium}
        imageURL={lessonPlan.imageURL}
        imageAlt={lessonPlan.imageAlt}
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