import { Box, Grid } from "@mui/material";
import MediaCard from "./LessonPlanCard";

export default function DisplayLessonplans({ lessonPlanItems }) {
  const lessonPlansToDisplay = lessonPlanItems.map((lessonPlanItem) => (
    <Grid item xs={4}>
      <MediaCard
        heading={lessonPlanItem.heading}
        imageURL={lessonPlanItem.imageURL}
        alt={lessonPlanItem.imageAlt}
        text={lessonPlanItem.description}
        chips={lessonPlanItem.chips}
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
