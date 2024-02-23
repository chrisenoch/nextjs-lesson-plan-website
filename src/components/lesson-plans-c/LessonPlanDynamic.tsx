"use client";

import { redirect, useSearchParams } from "next/navigation";
import LessonPlan from "./LessonPlan";
import { LessonPlanContent } from "@/models/types/LessonPlans/LessonPlanContent";

/**
 * Renders the appropriate lesson plan that matches the id specified in the query parameter.
 * Used in instead of generateStaticParams because this is a client component.
 */
export default function LessonPlanDynamic({
  content,
}: {
  content: LessonPlanContent[];
}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const lessonPlanContent = content.find(
    (content) => content.lessonPlanCardSummaryId === id
  );

  if (!lessonPlanContent) {
    redirect("/lessonplans");
  }

  return (
    <LessonPlan
      isPremium={lessonPlanContent.isPremium}
      title={lessonPlanContent.title}
      summary={lessonPlanContent.summary}
      warmer={lessonPlanContent.warmer}
      teachVocabulary={lessonPlanContent.teachVocabulary}
      vocabularyExercises={lessonPlanContent.vocabularyExercises}
      teachSpeakingPhrases={lessonPlanContent.teachSpeakingPhrases}
      rolePlay={lessonPlanContent.rolePlay}
      feedback={lessonPlanContent.feedback}
      plenary={lessonPlanContent.plenary}
    />
  );
}
