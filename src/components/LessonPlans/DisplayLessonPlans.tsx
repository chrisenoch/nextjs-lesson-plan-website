"use client";
import { Box, Grid } from "@mui/material";
import LessonPlanCard from "./LessonPlanCard";
import { LessonPlan } from "../../models/types/LessonPlan";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, selectAllBookmarks, selectFetchBookmarks } from "@/store";
import { useEffect } from "react";
import { fetchBookmarks } from "@/store/slices/with-thunks/lessonplans-slice";

export default function DisplayLessonplans({
  lessonPlans,
}: {
  lessonPlans: LessonPlan[];
}) {
  //To do: Move this to route component?
  const dispatch = useDispatch<AppDispatch>();

  const lessonPlanBookmarks = useSelector(selectAllBookmarks);
  const fetchBookMarks: null | {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  } = useSelector(selectFetchBookmarks);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  console.log("lessonPlanBookmarks in DisplayLessonPlans");
  console.log(lessonPlanBookmarks);
  console.log("fetchBookMarks in DisplayLessonPlans");
  console.log(fetchBookMarks);

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
