"use client";
import { Box, Grid } from "@mui/material";
import LessonPlanCard from "./LessonPlanCard";
import { LessonPlan } from "../../models/types/LessonPlan";
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
import { LoginStatus } from "@/models/types/LoginStatus";
import useRedirectWhenLoggedOut from "@/customHooks/useRedirectWhenLoggedOut";

export default function LessonPlanBookmarks({
  lessonPlans,
}: {
  lessonPlans: LessonPlan[];
}) {
  console.log("LessonPlanBookmarks rendered");
  const dispatch = useDispatch<AppDispatch>();
  useRedirectWhenLoggedOut("/auth/signin");

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

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "1200px",
        margin: "0 auto",
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
