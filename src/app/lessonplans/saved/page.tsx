import "server-only";
import { fetchLessonPlans } from "@/server-only/lessonplans";
import DisplayLessonPlansFactory from "@/components/LessonPlans/DisplayLessonPlansFactory";
import SearchAndDisplayLessonPlans from "@/components/LessonPlans/SearchAndDisplayLessonPlans";

export default async function SavedLessonPlans() {
  const lessonPlans = await fetchLessonPlans();
  //const lessonPlans: any = [];

  return (
    <SearchAndDisplayLessonPlans
      searchTitle="Search saved plans"
      displayLessonPlansComponent="DisplayBookmarkedLessonPlans"
      lessonPlans={lessonPlans}
      sxSearchLessonPlansTitle={{
        fontSize: { xs: "1.5rem", "350c": "2.125rem" },
      }}
    />
  );
}
