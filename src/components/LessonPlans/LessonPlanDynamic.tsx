"use client";

import { redirect, useSearchParams } from "next/navigation";
import LessonPlan from "./LessonPlan";

/**
 * Renders the appropriate lesson plan that matches the id specified in the query parameter.
 * Used in instead of generateStaticParams because this is a client component.
 */
export default function LessonPlanDynamic({
  content,
}: {
  content: { id: string; [key: string]: any }[];
}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const lessonPlanContent = content.find((content) => content.id === id);

  if (!lessonPlanContent) {
    redirect("/lessonplans");
  }

  return (
    <LessonPlan
      isPremium={lessonPlanContent.isPremium}
      title={lessonPlanContent.title}
      summary={lessonPlanContent.summary}
      warmer={lessonPlanContent.warmer}
      teachVocabulary={lessonPlanContent["teach-vocabulary"]}
      vocabularyExercises={lessonPlanContent["vocabulary-exercises"]}
      teachSpeakingPhrases={lessonPlanContent["teach-speaking-phrases"]}
      rolePlay={lessonPlanContent["role-play"]}
      feedback={lessonPlanContent.feedback}
      plenary={lessonPlanContent.plenary}
    />
  );
}
