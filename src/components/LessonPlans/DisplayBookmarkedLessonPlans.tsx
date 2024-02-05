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
import LoadingSpinner from "../Presentation/LoadingSpinner";
import { StandardResponseInfo } from "@/models/types/DataFetching/StandardResponseInfo";

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
  const fetchBookMarksStatus: StandardResponseInfo =
    useSelector(selectFetchBookmarks);

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
  if (!fetchBookMarksStatus.isLoading) {
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

  if (fetchBookMarksStatus.isLoading) {
    return (
      <Box display="flex" justifyContent={"center"}>
        <LoadingSpinner />
      </Box>
    );
  }

  const renderedContent = getRenderedContent(
    lessonPlansToDisplay,
    selectedLessonPlanCategories,
    bookmarks
  );

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
function getRenderedContent(
  lessonPlansToDisplay: any,
  selectedLessonPlanCategories: {
    title: string;
    category: LessonPlanCategory;
  }[],
  bookmarks: { userId: string; lessonPlanId: string }[]
) {
  if (lessonPlansToDisplay.length > 0) {
    return lessonPlansToDisplay;
  } else if (selectedLessonPlanCategories.length > 0 && bookmarks.length > 0) {
    return (
      <NotificationBox
        title="Too many filters"
        message=" No lesson plans are available that match all the filters you selected. Please try removing some filters from the search box to find more lesson plans."
      />
    );
  } else if (bookmarks.length < 1) {
    return (
      <Typography component="h1" variant="h5">
        You have not saved any lesson plans.
      </Typography>
    );
  }
  return null;
}
