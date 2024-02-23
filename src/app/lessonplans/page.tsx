import SearchAndDisplayLessonPlans from "@/components/lesson-plans-c/SearchAndDisplayLessonPlans";
import { fetchLessonPlanCardSummaries } from "@/server-only/lessonplans";

export default async function LessonPlansPage() {
  const lessonPlans = await fetchLessonPlanCardSummaries();

  return (
    <SearchAndDisplayLessonPlans
      searchTitle="Search lesson plans"
      lessonPlans={lessonPlans}
      showLoadingSpinner={false}
      showOnlyBookmarkedLessonPlans={false}
      shouldRedirectWhenLogout={false}
      sxSearchLessonPlansTitle={{
        fontSize: { xs: "1.5rem", "430c": "2.125rem" },
      }}
    />
  );
}
