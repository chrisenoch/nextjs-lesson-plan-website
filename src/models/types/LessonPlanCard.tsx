import { LessonPlan } from "./LessonPlan";
import { LessonPlanBookmarkStatus } from "./LessonPlanBookmarkStatus";

export type lessonPlanCard = LessonPlan & {
  isBookmarked: LessonPlanBookmarkStatus;
};
