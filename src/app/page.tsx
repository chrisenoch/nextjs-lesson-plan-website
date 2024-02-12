import "server-only";
import * as React from "react";
import Hero from "@/components/Hero";
import SearchAndDisplayLessonPlans from "@/components/LessonPlans/SearchAndDisplayLessonPlans";
import { fetchLessonPlans } from "../server-only/lessonplans";

export default async function HomePage() {
  const lessonPlans = await fetchLessonPlans();
  console.log("lessonPlans in page");

  return (
    <>
      <Hero />
      <SearchAndDisplayLessonPlans
        searchTitle="Search lesson plans"
        displayLessonPlansComponent="DisplayLessonPlans"
        lessonPlans={lessonPlans}
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
