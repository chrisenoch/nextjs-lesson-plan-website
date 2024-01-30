import "server-only";
import * as React from "react";
import Hero from "@/components/Hero";
import SearchAndDisplayLessonPlans from "@/components/LessonPlans/SearchAndDisplayLessonPlans";
import { fetchLessonPlans } from "../server-only/lessonplans";

export default async function HomePage() {
  const lessonPlans = await fetchLessonPlans();

  return (
    <>
      <Hero />
      <SearchAndDisplayLessonPlans
        searchTitle="Search lesson plans"
        displayLessonPlansComponent="DisplayLessonPlans"
        lessonPlans={lessonPlans}
        sxSearchLessonPlansOuterContainer={{ mt: 12 }}
      />
    </>
  );
}
