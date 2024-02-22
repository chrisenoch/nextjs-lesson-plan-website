"use client";
import { Box, Grid, Stack, Theme, Typography, useTheme } from "@mui/material";
import LessonPlanCard from "./LessonPlanCard";
import {
  selectAllBookmarks,
  selectFetchBookmarks,
  selectUserSessionStatus,
} from "@/store";
import { useEffect } from "react";
import {
  fetchBookmarks,
  toggleBookmark,
} from "@/store/slices/with-thunks/lessonplans-slice";
import useRedirectWhenLoggedOut from "@/customHooks/useRedirectWhenLoggedOut";
import { getBookmakedLessonPlanIds } from "@/component-functions/get-bookmarked-lessonplan-ids";
import NotificationBox from "../NotificationBox";
import { LessonPlanCategory } from "@/models/types/LessonPlans/LessonPlanCategory";
import LoadingSpinner from "../presentation/LoadingSpinner";
import { StandardResponseInfo } from "@/models/types/DataFetching/StandardResponseInfo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LessonPlanCardSummary } from "@/models/types/LessonPlans/LessonPlanCardSummary";

export default function DisplayLessonPlans({
  totalLessonPlansBeforeFiltered,
  filteredLessonPlans,
  selectedLessonPlanCategories,
  showLoadingSpinner,
  showOnlyBookmarkedLessonPlans,
  shouldRedirectWhenLogout,
  bookmarks,
}: {
  totalLessonPlansBeforeFiltered: number;
  filteredLessonPlans: LessonPlanCardSummary[];
  selectedLessonPlanCategories: {
    title: string;
    category: LessonPlanCategory;
  }[];
  showLoadingSpinner: boolean;
  shouldRedirectWhenLogout: boolean;
  showOnlyBookmarkedLessonPlans: boolean;
  bookmarks: {
    userId: string;
    lessonPlanId: string;
  }[];
}) {
  const dispatch = useAppDispatch();
  useRedirectWhenLoggedOut("/auth/signin", shouldRedirectWhenLogout);
  const muiTheme = useTheme();

  const fetchBookMarksInfo: StandardResponseInfo =
    useAppSelector(selectFetchBookmarks);

  const userSessionStatus = useAppSelector(selectUserSessionStatus);

  useEffect(() => {
    dispatch(fetchBookmarks());
  }, [dispatch]);

  let areBookmarksReady = false;
  const bookmarkedLessonPlanIds = getBookmakedLessonPlanIds(
    filteredLessonPlans,
    bookmarks
  );

  //Set here because bookmarks are not ready until they have both loaded and getBookmakedLessonPlanIds# has run.
  if (!fetchBookMarksInfo.isLoading) {
    areBookmarksReady = true;
  } else if (showLoadingSpinner) {
    return (
      <Box display="flex" justifyContent={"center"}>
        <LoadingSpinner />
      </Box>
    );
  }

  function handleToggleBookmark(lessonPlanId: string) {
    dispatch(toggleBookmark(lessonPlanId));
  }

  const lessonPlansToDisplay = filteredLessonPlans
    .filter((lessonPlan) => {
      if (showOnlyBookmarkedLessonPlans) {
        return bookmarkedLessonPlanIds.has(lessonPlan.id);
      } else {
        return lessonPlan;
      }
    })
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
            height: { xs: "130px", "430c": "160px", md: "200px" },
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
          //   isBookmarked={
          //     !areBookmarksReady ? "BOOKMARKS_NOT_READY" : "IS_BOOKMARKED"
          //   }
          isBookmarked={
            !areBookmarksReady
              ? "BOOKMARKS_NOT_READY"
              : bookmarkedLessonPlanIds.has(lessonPlan.id)
              ? "IS_BOOKMARKED"
              : "IS_NOT_BOOKMARKED"
          }
          handleToggleBookmark={handleToggleBookmark}
          userSessionStatus={userSessionStatus}
        />
      </Stack>
    ));

  const renderedContent = getRenderedContent(
    totalLessonPlansBeforeFiltered,
    lessonPlansToDisplay,
    selectedLessonPlanCategories,
    bookmarks,
    showOnlyBookmarkedLessonPlans,
    muiTheme
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
  totalLessonPlansBeforeFiltered: number,
  lessonPlansToDisplay: any,
  selectedLessonPlanCategories: {
    title: string;
    category: LessonPlanCategory;
  }[],
  bookmarks: { userId: string; lessonPlanId: string }[],
  showOnlyBookmarkedLessonPlans: boolean,
  theme: Theme
) {
  if (totalLessonPlansBeforeFiltered < 1) {
    return (
      <NotificationBox
        data-testid="noLessonPlansToDisplay"
        title="No lesson plans to display"
        message=" This may be due to an error. Please try refreshing the page."
        variant="error"
        sxOuterContainer={{
          maxWidth: "700px",
          mt: { xs: 0, md: 4 },
          mx: "auto",
        }}
        sxMessage={{
          fontSize: { xs: theme.typography.body2.fontSize, "430c": "1rem" },
        }}
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

  if (
    (selectedLessonPlanCategories.length > 0 &&
      !showOnlyBookmarkedLessonPlans) ||
    (selectedLessonPlanCategories.length > 0 &&
      showOnlyBookmarkedLessonPlans &&
      bookmarks.length > 0)
  ) {
    return (
      <NotificationBox
        data-testid="tooManyFilters"
        title="Too many filters"
        message=" No lesson plans are available that match all the filters you selected. Please try removing some filters from the search box to find more lesson plans."
        sxOuterContainer={{
          maxWidth: "700px",
          mt: { xs: 0, md: 4 },
          mx: "auto",
        }}
        sxMessage={{
          fontSize: { xs: theme.typography.body2.fontSize, "430c": "1rem" },
        }}
        sxTitle={{ fontSize: { xs: "1.5rem", "430c": "2.125rem" } }}
      />
    );
  }

  if (showOnlyBookmarkedLessonPlans && bookmarks.length < 1) {
    return (
      <NotificationBox
        data-testid="noSavedLessonPlans"
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
