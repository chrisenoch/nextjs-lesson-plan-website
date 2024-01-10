import * as React from "react";
import Hero from "@/components/Hero";
import SearchAndDisplayLessonPlans from "@/components/LessonPlanSearch/SearchAndDisplayLessonPlans";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchAndDisplayLessonPlans />
    </>
  );
}
