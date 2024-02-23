import { LessonPlan } from "./LessonPlan";

export type LessonPlanContent = LessonPlan & {
  id: string;
  lessonPlanCardSummaryId: string;
};
