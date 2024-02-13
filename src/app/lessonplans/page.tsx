import SearchAndDisplayLessonPlans from "@/components/LessonPlans/SearchAndDisplayLessonPlans";
import { fetchLessonPlans } from "@/server-only/lessonplans";

export default async function LessonPlansPage() {
  const lessonPlans = await fetchLessonPlans();

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
