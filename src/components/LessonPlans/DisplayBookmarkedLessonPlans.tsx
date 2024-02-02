"use client";
import { Box, Grid, Typography } from "@mui/material";
import LessonPlanCard from "./LessonPlanCard";
import { LessonPlan } from "../../models/types/LessonPlans/LessonPlan";
import { useDispatch, useSelector } from "react-redux";
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
import useRedirectWhenLoggedOut from "@/customHooks/useRedirectWhenLoggedOut";
import { getBookmakedLessonPlanIds } from "@/component-functions/get-bookmarked-lessonplan-ids";
import NotificationBox from "../NotificationBox";
import { LessonPlanCategory } from "@/models/types/LessonPlans/LessonPlanCategory";

export default function DisplayLessonPlanBookmarks({
  lessonPlans,
  selectedLessonPlanCategories,
}: {
  lessonPlans: LessonPlan[];
  selectedLessonPlanCategories: {
    title: string;
    category: LessonPlanCategory;
  }[];
}) {
  console.log("LessonPlanBookmarks rendered");
  const dispatch = useDispatch<AppDispatch>();
  useRedirectWhenLoggedOut("/auth/signin");

  const bookmarks: {
    userId: string;
    lessonPlanId: string;
  }[] = useSelector(selectAllBookmarks);
  const fetchBookMarks: {
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
  if (!fetchBookMarks.isLoading) {
    areBookmarksReady = true;
  }

  function handleToggleBookmark(lessonPlanId: string) {
    dispatch(toggleBookmark(lessonPlanId));
  }

  const lessonPlansToDisplay = lessonPlans
    .filter((lessonPlan) => bookmarkedLessonPlanIds.has(lessonPlan.id))
    .map((lessonPlan) => (
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
            !areBookmarksReady ? "BOOKMARKS_NOT_READY" : "IS_BOOKMARKED"
          }
          handleToggleBookmark={handleToggleBookmark}
          loginStatus={loginStatus}
        />
      </Grid>
    ));

  let renderedContent;
  if (fetchBookMarks.isLoading) {
    return <h1>Loading</h1>;
  } else if (lessonPlansToDisplay.length > 0) {
    renderedContent = lessonPlansToDisplay;
  } else if (selectedLessonPlanCategories.length > 0 && bookmarks.length > 0) {
    renderedContent = (
      <NotificationBox
        title="Too many filters"
        message=" No lesson plans are available that match all the filters you selected. Please try removing some filters from the search box to find more lesson plans."
      />
    );
  } else if (bookmarks.length < 1) {
    renderedContent = (
      <Typography component="h1" variant="h5">
        You have not saved any lesson plans.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "1200px",
        margin: "0 auto",
      }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {renderedContent}
      </Grid>
    </Box>
  );
}
