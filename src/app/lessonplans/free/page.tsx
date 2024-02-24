import LessonPlanDynamic from "@/components/lesson-plans-c/LessonPlanDynamic";
import { LessonPlanContent } from "@/models/types/LessonPlans/LessonPlanContent";
import { getLessonPlanContents } from "@/server-only/lessonplan-functions";

async function getFreeLessonPlanContents() {
  let lessonPlanContents = await getLessonPlanContents();
  const finalLessonPlanContents = lessonPlanContents.filter(
    (lessonPlanContent: LessonPlanContent) =>
      lessonPlanContent.id === "-NrMMd99OT-hwwbzYuhq" // To do: get this from server
  );
  return finalLessonPlanContents;
}

export default async function FreeLessonPlanPage() {
  const lessonPlanContents = await getFreeLessonPlanContents();
  console.log("lessonplanContent in FreeLessonPlansPage");
  console.log(lessonPlanContents);
  return <LessonPlanDynamic content={lessonPlanContents} />;
}
