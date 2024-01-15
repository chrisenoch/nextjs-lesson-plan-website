import "server-only";
import { fetchLessonPlans } from "@/server-only/lessonplans";
import LessonPlanBookmarks from "@/components/LessonPlans/LessonPlanBookmarks";

export default async function SavedLessonPlans() {
  const lessonPlans = await fetchLessonPlans();
  return <LessonPlanBookmarks lessonPlans={lessonPlans} />;
}
