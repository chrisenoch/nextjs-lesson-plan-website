"use client";
import { Box, Grid, Stack, Typography } from "@mui/material";
import LessonPlanCard from "./LessonPlanCard";
import { LessonPlan } from "../../models/types/LessonPlans/LessonPlan";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  selectAllBookmarks,
  selectFetchBookmarks,
  selectLoginStatus,
} from "@/store";
import { useEffect, useState } from "react";
import {
  fetchBookmarks,
  toggleBookmark,
} from "@/store/slices/with-thunks/lessonplans-slice";
import { LoginStatus } from "@/models/types/Auth/LoginStatus";
import { getBookmakedLessonPlanIds } from "@/component-functions/get-bookmarked-lessonplan-ids";
import NotificationBox from "../NotificationBox";

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

  const loginStatus: LoginStatus = useSelector(selectLoginStatus);

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
        ) : (
          <NotificationBox
            title="Too many filters"
            message=" No lesson plans are available that match all the filters you selected. Please try removing some filters from the search box to find more lesson plans."
          />
        )}
      </Grid>
    </Box>
  );
}
