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

  const lessonPlansToDisplay = lessonPlans.map((lessonPlan) => (
    // <Grid item xs={12} sm={6} md={4} key={lessonPlan.title}>
    <Stack
      direction="row"
      //item
      sx={{
        minWidth: "265px",
        maxWidth: { xs: "80%", "430c": "320px", sm: "390px", lg: "438px" }, //sm: "438px"
        height: "fit-content",
        maxHeight: "fit-content",
        //maxWidth: "48%",
        //marginLeft: 0,
      }}
      key={lessonPlan.title}>
      <LessonPlanCard
        sxImage={{
          height: { xs: "120px", "430c": "180px", sm: "200px" },
        }}
        sxDescription={{
          display: { xs: "none", sm: "block" },
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
          !areBookmarksReady
            ? "BOOKMARKS_NOT_READY"
            : bookmarkedLessonPlanIds.has(lessonPlan.id)
            ? "IS_BOOKMARKED"
            : "IS_NOT_BOOKMARKED"
        }
        handleToggleBookmark={handleToggleBookmark}
        loginStatus={loginStatus}
      />
    </Stack>
  ));

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: "1200px",
        minHeight: "600px",
        margin: "0 auto",
      }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
        }}>
        {lessonPlansToDisplay.length > 0 ? (
          lessonPlansToDisplay
        ) : selectedLessonPlanCategories.length > 0 ? (
          <NotificationBox
            title="Too many filters"
            message=" No lesson plans are available that match all the filters you selected. Please try removing some filters from the search box to find more lesson plans."
          />
        ) : (
          <NotificationBox
            title="No lesson plans to display"
            message=" This may be due to an error. Please try refreshing the page."
            variant="error"
          />
        )}
      </Stack>
    </Box>
  );
}
