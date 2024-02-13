"use client";
import { Box, Grid, Stack, Typography } from "@mui/material";
import LessonPlanCard from "./LessonPlanCard";
import { LessonPlan } from "../../models/types/LessonPlans/LessonPlan";
import {
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";

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
  console.log(lessonPlans);

  const dispatch = useAppDispatch();
  useRedirectWhenLoggedOut("/auth/signin");

  const bookmarks: {
    userId: string;
    lessonPlanId: string;
  }[] = useAppSelector(selectAllBookmarks);
  const fetchBookMarksInfo: StandardResponseInfo =
    useAppSelector(selectFetchBookmarks);

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
  if (!fetchBookMarksInfo.isLoading) {
    areBookmarksReady = true;
  }

  function handleToggleBookmark(lessonPlanId: string) {
    dispatch(toggleBookmark(lessonPlanId));
  }

  const lessonPlansToDisplay = lessonPlans
    .filter((lessonPlan) => bookmarkedLessonPlanIds.has(lessonPlan.id))
    .map((lessonPlan) => (
      <Stack
        direction="row"
        sx={{
          height: "fit-content",
          maxHeight: "fit-content",
        }}
        key={lessonPlan.title}>
        <LessonPlanCard
          sxImage={{
            height: { xs: "120px", "430c": "180px", sm: "200px" },
          }}
          sxDescription={{
            display: { xs: "none", md: "block" },
          }}
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
      </Stack>
    ));

  if (fetchBookMarksInfo.isLoading) {
    return (
      <Box display="flex" justifyContent={"center"}>
        <LoadingSpinner />
      </Box>
    );
  }

  const renderedContent = getRenderedContent(
    lessonPlans,
    lessonPlansToDisplay,
    selectedLessonPlanCategories,
    bookmarks
  );

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "1200px",
        minHeight: "600px",
        margin: "0 auto",
        justifyContent: "center",
        width: "100%",
      }}>
      {renderedContent}
    </Box>
  );
}
function getRenderedContent(
  lessonPlans: LessonPlan[],
  lessonPlansToDisplay: any,
  selectedLessonPlanCategories: {
    title: string;
    category: LessonPlanCategory;
  }[],
  bookmarks: { userId: string; lessonPlanId: string }[]
) {
  if (lessonPlans.length < 1) {
    return (
      <NotificationBox
        title="No lesson plans to display"
        message=" This may be due to an error. Please try refreshing the page."
        variant="error"
        sxOuterContainer={{
          maxWidth: "700px",
          mt: { xs: 0, md: 4 },
          mx: "auto",
        }}
        sxMessage={{ fontSize: { xs: "0.875rem", "430c": "1rem" } }}
        sxTitle={{ fontSize: { xs: "1.5rem", "430c": "2.125rem" } }}
      />
    );
  }

  if (lessonPlansToDisplay.length > 0) {
    return (
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: {
            xs: "repeat(1,minmax(265px, 80%))",
            "430c": "repeat(1,minmax(265px, 320px))",
            "715c": "repeat(2,minmax(265px, 320px))",
            md: "repeat(2,minmax(265px, 390px))",
            lg: "repeat(2,minmax(265px, 438px))",
          },
          gap: 3,
        }}>
        {lessonPlansToDisplay}
      </Box>
    );
  }

  if (selectedLessonPlanCategories.length > 0 && bookmarks.length > 0) {
    return (
      <NotificationBox
        title="Too many filters"
        message=" No lesson plans are available that match all the filters you selected. Please try removing some filters from the search box to find more lesson plans."
        sxOuterContainer={{
          maxWidth: "700px",
          mt: { xs: 0, md: 4 },
          mx: "auto",
        }}
        sxMessage={{ fontSize: { xs: "0.875rem", "430c": "1rem" } }}
        sxTitle={{ fontSize: { xs: "1.5rem", "430c": "2.125rem" } }}
      />
    );
  }

  if (bookmarks.length < 1) {
    return (
      <NotificationBox
        message="You have not saved any lesson plans."
        sxOuterContainer={{
          marginTop: 2,
        }}
        sxMessage={{ fontSize: { xs: "1rem", md: "1.125rem" } }}
      />
    );
  }
  return null;
}
