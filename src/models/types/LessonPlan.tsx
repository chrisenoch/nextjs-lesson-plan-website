import { LessonPlanType } from "./LessonPlanCategoryShort";

export type LessonPlan = {
  id: string;
  title: string;
  description: string;
  isPremium: boolean;
  imageURL: string;
  imageAlt: string;
  chips: {
    title: string;
    category: LessonPlanType;
  }[];
};
