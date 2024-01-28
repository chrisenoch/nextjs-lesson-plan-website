import { LessonPlan } from "./LessonPlan";
import { LessonPlanBookmarkStatus } from "./LessonPlanBookmarkStatus";
import { LoginStatus } from "../Auth/LoginStatus";

export type LessonPlanCard = LessonPlan & {
  isBookmarked: LessonPlanBookmarkStatus;
  handleToggleBookmark: (lessonPlanId: string) => void;
  loginStatus: LoginStatus;
};
