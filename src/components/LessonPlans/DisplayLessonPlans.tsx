"use client";
import { Box, Grid } from "@mui/material";
import LessonPlanCard from "./LessonPlanCard";
import { LessonPlan } from "../../models/types/LessonPlan";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, selectAllBookmarks, selectFetchBookmarks } from "@/store";
import { useEffect } from "react";
import {
  fetchBookmarks,
  toggleBookmark,
} from "@/store/slices/with-thunks/lessonplans-slice";
import { getArrayIntersection } from "@/utils/array-functions";

export default function DisplayLessonplans({
  lessonPlans,
}: {
  lessonPlans: LessonPlan[];
}) {
  //To do: Move this to route component?
  const dispatch = useDispatch<AppDispatch>();
  console.log("display lesson plans rendered");

  const bookmarks: {
    userId: string;
    lessonPlanId: string;
  }[] = useSelector(selectAllBookmarks);
  const fetchBookMarks: null | {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  } = useSelector(selectFetchBookmarks);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  let areBookmarksReady = false;
  const bookmarkedLessonPlanIds = getBookmakedLessonPlanIds(
    lessonPlans,
    bookmarks
  );

  //Set here because bookmarks are not ready until they have both loaded and getBookmakedLessonPlanIds# has run.
  if (!fetchBookMarks?.isLoading) {
    areBookmarksReady = true;
  }

  function handleToggleBookmark(lessonPlanId: string) {
    dispatch(toggleBookmark(lessonPlanId));
  }

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
        isBookmarked={
          !areBookmarksReady
            ? "BOOKMARKS_NOT_READY"
            : bookmarkedLessonPlanIds.has(lessonPlan.id)
            ? "IS_BOOKMARKED"
            : "IS_NOT_BOOKMARKED"
        }
        handleToggleBookmark={handleToggleBookmark}
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
function getBookmakedLessonPlanIds(
  lessonPlans: LessonPlan[],
  bookmarks: { userId: string; lessonPlanId: string }[]
) {
  const bookmarkedLessonPlanIds = new Set<string>();
  for (const lessonPlan of lessonPlans) {
    for (const bookmark of bookmarks) {
      if (bookmark.lessonPlanId === lessonPlan.id) {
        bookmarkedLessonPlanIds.add(lessonPlan.id);
        break;
      }
    }
  }
  return bookmarkedLessonPlanIds;
}
