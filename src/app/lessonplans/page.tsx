import SearchAndDisplayLessonPlans from "@/components/LessonPlans/SearchAndDisplayLessonPlans";
import { fetchLessonPlans } from "@/server-only/lessonplans";

export default async function LessonPlansPage() {
  const lessonPlans = await fetchLessonPlans();
  return (
    <SearchAndDisplayLessonPlans
      searchTitle="Search lesson plans"
      displayLessonPlansComponent="DisplayLessonPlans"
      lessonPlans={lessonPlans}
    />
  );
}
