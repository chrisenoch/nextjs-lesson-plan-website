import { UserSessionStatus } from "../Auth/UserSession";
import { LessonPlan } from "./LessonPlan";
import { LessonPlanBookmarkStatus } from "./LessonPlanBookmarkStatus";
import { SxProps, Theme } from "@mui/material";

export type LessonPlanCard = LessonPlan & {
  isBookmarked: LessonPlanBookmarkStatus;
  handleToggleBookmark: (lessonPlanId: string) => void;
  userSessionStatus: UserSessionStatus;
  sxImage?: SxProps<Theme>;
  sxDescription?: SxProps<Theme>;
};
