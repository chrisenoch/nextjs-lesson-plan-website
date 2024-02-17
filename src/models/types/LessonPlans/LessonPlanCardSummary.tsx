import { LessonPlanType } from "./LessonPlanCategoryShort";
import { LessonPlanLevel } from "./LessonPlanLevel";

export type LessonPlanCardSummary = {
  id: string;
  title: string;
  duration: string;
  prepTime: string;
  level: LessonPlanLevel;
  description: string;
  isPremium: boolean;
  imageURL: string;
  imageAlt: string;
  chips: {
    title: string;
    category: LessonPlanType;
  }[];
};
