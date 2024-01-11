import * as React from "react";
import Hero from "@/components/Hero";
import SearchAndDisplayLessonPlans from "@/components/LessonPlanSearch/SearchAndDisplayLessonPlans";

export default async function HomePage() {
  let lessonPlans;
  try {
    const response = await fetch("http://localhost:3001/lesson-plans"); // Used in place of a database.
    lessonPlans = await response.json();
  } catch {
    lessonPlans = [];
  }

  return (
    <>
      <Hero />
      <SearchAndDisplayLessonPlans lessonPlans={lessonPlans} />
    </>
  );
}
