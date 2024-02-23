import LessonPlanDynamic from "@/components/lesson-plans-c/LessonPlanDynamic";
import { LessonPlanContent } from "@/models/types/LessonPlans/LessonPlanContent";
import { getLessonPlanContents } from "@/server-only/lessonplan-functions";

async function getGoldLessonPlanContents() {
  let lessonPlanContents = await getLessonPlanContents();
  const finalLessonPlanContents = lessonPlanContents.filter(
    (lessonPlanContent: LessonPlanContent) =>
      lessonPlanContent.id !== "-NrGKdP73hkXKS97Cce5" // To do: get these from server
  );
  return finalLessonPlanContents;
}

export default async function GoldLessonPlanPage() {
  const lessonPlanContents = await getGoldLessonPlanContents();
  return <LessonPlanDynamic content={lessonPlanContents} />;
}
