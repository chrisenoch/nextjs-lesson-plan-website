import { LessonPlanType } from "./LessonPlanCategoryShort";

export type LessonPlan = {
  title: string;
  description: string;
  imageURL: string;
  imageAlt: string;
  chips: {
    title: string;
    category: LessonPlanType;
  }[];
};
