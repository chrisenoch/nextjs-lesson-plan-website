import "server-only";
import { fetchLessonPlans } from "@/server-only/lessonplans";
import SearchAndDisplayLessonPlans from "@/components/lesson-plans-c/SearchAndDisplayLessonPlans";

export default async function SavedLessonPlans() {
  const lessonPlans = await fetchLessonPlans();
  //const lessonPlans: any = [];

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
