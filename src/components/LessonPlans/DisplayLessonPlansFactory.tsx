import { LessonPlan } from "../../models/types/LessonPlan";
import { cloneElement } from "react";
import DisplayBookmarkedLessonPlans from "./DisplayBookmarkedLessonPlans";
import DisplayLessonPlans from "./DisplayLessonPlans";

export default function DisplayLessonplansFactoy({
  lessonPlans,
  displayLessonPlansComponent,
}: {
  lessonPlans: LessonPlan[];
  displayLessonPlansComponent:
    | "DisplayLessonPlans"
    | "DisplayBookmarkedLessonPlans";
}) {
  if (displayLessonPlansComponent === "DisplayLessonPlans") {
    return <DisplayLessonPlans lessonPlans={lessonPlans} />;
  }
  if (displayLessonPlansComponent === "DisplayBookmarkedLessonPlans") {
    return <DisplayBookmarkedLessonPlans lessonPlans={lessonPlans} />;
  }
}
