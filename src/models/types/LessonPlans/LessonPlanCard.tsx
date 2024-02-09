import { LessonPlan } from "./LessonPlan";
import { LessonPlanBookmarkStatus } from "./LessonPlanBookmarkStatus";
import { LoginStatus } from "../Auth/LoginStatus";
import { SxProps, Theme } from "@mui/material";

export type LessonPlanCard = LessonPlan & {
  isBookmarked: LessonPlanBookmarkStatus;
  handleToggleBookmark: (lessonPlanId: string) => void;
  loginStatus: LoginStatus;
  sxImage?: SxProps<Theme>;
  sxDescription?: SxProps<Theme>;
};
