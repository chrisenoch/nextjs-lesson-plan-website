import { UserSessionStatus } from "../Auth/UserSession";
import { LessonPlanBookmarkStatus } from "./LessonPlanBookmarkStatus";
import { SxProps, Theme } from "@mui/material";
import { LessonPlanCardSummary } from "./LessonPlanCardSummary";

export type LessonPlanCard = LessonPlanCardSummary & {
  isBookmarked: LessonPlanBookmarkStatus;
  handleToggleBookmark: (lessonPlanId: string) => void;
  userSessionStatus: UserSessionStatus;
  sxImage?: SxProps<Theme>;
  sxDescription?: SxProps<Theme>;
};
