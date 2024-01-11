import * as React from "react";
import Hero from "@/components/Hero";
import SearchAndDisplayLessonPlans from "@/components/LessonPlanSearch/SearchAndDisplayLessonPlans";
import { fetchLessonPlans } from "../server-only/lessonplans";

export default async function HomePage() {
  const lessonPlans = await fetchLessonPlans();

  return (
    <>
      <Hero />
      <SearchAndDisplayLessonPlans lessonPlans={lessonPlans} />
    </>
  );
}
