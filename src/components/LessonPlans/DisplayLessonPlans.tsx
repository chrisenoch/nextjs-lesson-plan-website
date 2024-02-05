"use client";
import { Box, Grid, Stack, Typography } from "@mui/material";
import LessonPlanCard from "./LessonPlanCard";
import { LessonPlan } from "../../models/types/LessonPlans/LessonPlan";
import {
  AppDispatch,
  selectAllBookmarks,
  selectFetchBookmarks,
  selectLoginStatus,
} from "@/store";
import { useEffect } from "react";
import {
  fetchBookmarks,
  toggleBookmark,
} from "@/store/slices/with-thunks/lessonplans-slice";
import { LoginStatus } from "@/models/types/Auth/LoginStatus";
import { getBookmakedLessonPlanIds } from "@/component-functions/get-bookmarked-lessonplan-ids";
import NotificationBox from "../NotificationBox";
import { LessonPlanCategory } from "@/models/types/LessonPlans/LessonPlanCategory";
import { StandardResponseInfo } from "@/models/types/DataFetching/StandardResponseInfo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function DisplayLessonplans({
  lessonPlans,
  selectedLessonPlanCategories,
}: {
  lessonPlans: LessonPlan[];
  selectedLessonPlanCategories: {
    title: string;
    category: LessonPlanCategory;
  }[];
}) {
  //To do: Move this to route component?
  const dispatch = useAppDispatch();
  console.log("display lesson plans rendered");

  const bookmarks: {
    userId: string;
    lessonPlanId: string;
  }[] = useAppSelector(selectAllBookmarks);
  const fetchBookMarksStatus: StandardResponseInfo =
    useAppSelector(selectFetchBookmarks);

  console.log("fetchBookmarks in DisplayLessonPlans ");
  console.log(fetchBookMarksStatus);

  const loginStatus: LoginStatus = useAppSelector(selectLoginStatus);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  let areBookmarksReady = false;
  const bookmarkedLessonPlanIds = getBookmakedLessonPlanIds(
    lessonPlans,
    bookmarks
  );

  //Set here because bookmarks are not ready until they have both loaded and getBookmakedLessonPlanIds# has run.
  if (!fetchBookMarksStatus.isLoading) {
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
        loginStatus={loginStatus}
      />
    </Grid>
  ));

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "1200px",
        minHeight: "600px",
        margin: "0 auto",
      }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {lessonPlansToDisplay.length > 0 ? (
          lessonPlansToDisplay
        ) : selectedLessonPlanCategories.length > 0 ? (
          <NotificationBox
            title="Too many filters"
            message=" No lesson plans are available that match all the filters you selected. Please try removing some filters from the search box to find more lesson plans."
          />
        ) : (
          <h1>No lesson plans to display</h1>
        )}
      </Grid>
    </Box>
  );
}
