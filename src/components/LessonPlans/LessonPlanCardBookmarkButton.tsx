"use client";

import { UserSessionStatus } from "@/models/types/Auth/UserSession";
import { Done, RocketLaunch } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";

export default function LessonPlanCardBookmarkButton({
  userSessionStatus,
  isBookmarked,
  handleToggleBookmark,
  id,
}: {
  userSessionStatus: UserSessionStatus;
  isBookmarked: string;
  handleToggleBookmark: (lessonPlanId: string) => void;
  id: string;
}) {
  const bookmarkButton = hydrateAndSelectBookmarkButton(
    userSessionStatus,
    isBookmarked,
    handleToggleBookmark,
    id
  );

  return <>{bookmarkButton}</>;

  function hydrateAndSelectBookmarkButton(
    userSessionStatus: UserSessionStatus,
    isBookmarked: string,
    handleToggleBookmark: (lessonPlanId: string) => void,
    id: string
  ) {
    let bookmarkButton;
    if (userSessionStatus === "ACTIVE" && isBookmarked === "IS_BOOKMARKED") {
      bookmarkButton = (
        <Button
          onClick={() => handleToggleBookmark(id)}
          variant="outlined"
          size="small"
          startIcon={<Done />}>
          Saved
        </Button>
      );
    } else if (
      userSessionStatus === "ACTIVE" &&
      isBookmarked === "IS_NOT_BOOKMARKED"
    ) {
      bookmarkButton = (
        <Button
          onClick={() => handleToggleBookmark(id)}
          variant="outlined"
          size="small"
          startIcon={<RocketLaunch />}>
          Save
        </Button>
      );
    } else if (
      userSessionStatus === "ACTIVE" &&
      isBookmarked === "BOOKMARKS_NOT_READY"
    ) {
      bookmarkButton = (
        <LoadingButton sx={{ px: 0 }} loading disabled variant="outlined">
          {/* value here affects the button size */}Save
        </LoadingButton>
      );
    } else {
      bookmarkButton = null;
    }
    return bookmarkButton;
  }
}
