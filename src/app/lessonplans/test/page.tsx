import LessonPlansTest from "@/components/LessonPlans/LessonPlansTest";
import SearchAndDisplayLessonPlans from "@/components/LessonPlans/SearchAndDisplayLessonPlans";
import { fetchLessonPlans } from "@/server-only/lessonplans";

export default async function LessonPlansTestPage() {
  const lessonPlans = await fetchLessonPlans();

  return <LessonPlansTest lessonPlans={lessonPlans} />;
}
