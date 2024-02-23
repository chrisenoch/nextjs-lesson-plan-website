import "server-only";
import SearchAndDisplayLessonPlans from "@/components/lesson-plans-c/SearchAndDisplayLessonPlans";
import { firebaseGETCollection } from "@/server-only/route-functions";
import { fetchLessonPlanCardSummaries } from "@/server-only/lessonplan-functions";

export default async function SavedLessonPlans() {
  const lessonPlans = await fetchLessonPlanCardSummaries();

  return (
    <SearchAndDisplayLessonPlans
      searchTitle="Search saved plans"
      lessonPlans={lessonPlans}
      showLoadingSpinner={true}
      showOnlyBookmarkedLessonPlans={true}
      shouldRedirectWhenLogout={true}
      sxSearchLessonPlansTitle={{
        fontSize: { xs: "1.5rem", "350c": "2.125rem" },
      }}
    />
  );
}
