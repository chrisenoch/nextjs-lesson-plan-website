import "server-only";
import * as React from "react";
import Hero from "@/components/layout-c/Hero";
import SearchAndDisplayLessonPlans from "@/components/lesson-plans-c/SearchAndDisplayLessonPlans";
import { fetchLessonPlanCardSummaries } from "@/server-only/lessonplan-functions";

export default async function HomePage() {
  const lessonPlans = await fetchLessonPlanCardSummaries();
  //const lessonPlans: any = [];

  return (
    <>
      <Hero />
      <SearchAndDisplayLessonPlans
        searchTitle="Search lesson plans"
        lessonPlans={lessonPlans}
        showLoadingSpinner={false}
        showOnlyBookmarkedLessonPlans={false}
        shouldRedirectWhenLogout={false}
        sxSearchLessonPlansTitle={{
          fontSize: { xs: "1.5rem", "430c": "2.125rem" },
        }}
        sxSearchLessonPlansOuterContainer={{
          mt: { xs: 6, md: 12 },
          // mb: { xs: 2, md: 4 },
        }}
      />
    </>
  );
}
