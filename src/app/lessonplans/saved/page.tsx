import "server-only";
import { fetchLessonPlans } from "@/server-only/lessonplans";
import DisplayLessonplansFactoy from "@/components/LessonPlans/DisplayLessonPlansFactory";
import SearchAndDisplayLessonPlans from "@/components/LessonPlans/SearchAndDisplayLessonPlans";

export default async function SavedLessonPlans() {
  const lessonPlans = await fetchLessonPlans();

  return (
    <SearchAndDisplayLessonPlans
      searchTitle="Search saved plans"
      displayLessonPlansComponent="DisplayBookmarkedLessonPlans"
      lessonPlans={lessonPlans}
    />
  );
}
