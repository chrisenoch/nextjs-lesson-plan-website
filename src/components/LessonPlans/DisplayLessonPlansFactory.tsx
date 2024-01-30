import { LessonPlan } from "../../models/types/LessonPlans/LessonPlan";
import { cloneElement } from "react";
import DisplayBookmarkedLessonPlans from "./DisplayBookmarkedLessonPlans";
import DisplayLessonPlans from "./DisplayLessonPlans";

export default function DisplayLessonPlansFactory({
  lessonPlans,
  displayLessonPlansComponent,
}: {
  lessonPlans: LessonPlan[];
  displayLessonPlansComponent:
    | "DisplayLessonPlans"
    | "DisplayBookmarkedLessonPlans";
}) {
  switch (displayLessonPlansComponent) {
    case "DisplayLessonPlans":
      return <DisplayLessonPlans lessonPlans={lessonPlans} />;
    case "DisplayBookmarkedLessonPlans":
      return <DisplayBookmarkedLessonPlans lessonPlans={lessonPlans} />;
  }
}
