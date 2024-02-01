import { LessonPlan } from "../../models/types/LessonPlans/LessonPlan";
import { cloneElement } from "react";
import DisplayBookmarkedLessonPlans from "./DisplayBookmarkedLessonPlans";
import DisplayLessonPlans from "./DisplayLessonPlans";
import { LessonPlanCategory } from "@/models/types/LessonPlans/LessonPlanCategory";

export default function DisplayLessonPlansFactory({
  lessonPlans,
  displayLessonPlansComponent,
  selectedLessonPlanCategories,
}: {
  lessonPlans: LessonPlan[];
  displayLessonPlansComponent:
    | "DisplayLessonPlans"
    | "DisplayBookmarkedLessonPlans";
  selectedLessonPlanCategories: {
    title: string;
    category: LessonPlanCategory;
  }[];
}) {
  switch (displayLessonPlansComponent) {
    case "DisplayLessonPlans":
      return (
        <DisplayLessonPlans
          lessonPlans={lessonPlans}
          selectedLessonPlanCategories={selectedLessonPlanCategories}
        />
      );
    case "DisplayBookmarkedLessonPlans":
      return (
        <DisplayBookmarkedLessonPlans
          lessonPlans={lessonPlans}
          selectedLessonPlanCategories={selectedLessonPlanCategories}
        />
      );
  }
}
