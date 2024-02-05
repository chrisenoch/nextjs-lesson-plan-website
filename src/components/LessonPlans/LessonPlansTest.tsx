"use client";
import { LessonPlan } from "@/models/types/LessonPlans/LessonPlan";
import { Button } from "@mui/material";

export default function LessonPlansTest({
  lessonPlans,
}: {
  lessonPlans: LessonPlan[];
}) {
  const content = lessonPlans.map((lp) => <p key={lp.title}>{lp.title}</p>);
  return (
    <>
      <h1>LessonPlansTest</h1>
      {content}
      <Button onClick={() => console.log("clicked")}>Click me</Button>
    </>
  );
}
