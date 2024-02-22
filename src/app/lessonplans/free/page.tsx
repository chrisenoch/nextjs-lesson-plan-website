import LessonPlan from "@/components/lesson-plans/LessonPlan";
import LessonPlanDynamic from "@/components/lesson-plans/LessonPlanDynamic";

async function getLessonPlanContents() {
  let lessonPlans: {
    id: string;
    isPremium: boolean;
    title: string;
    summary: string;
    warmer: string;
    teachVocabulary: string;
    vocabularyExercises: string;
    teachSpeakingPhrases: string;
    rolePlay: string;
    feedback: string;
    plenary: string;
  }[];
  try {
    const response = await fetch(`http://localhost:3001/lesson-plan-content`);
    if (!response.ok) {
      throw new Error("Unable to fetch lesson plans");
    }
    lessonPlans = await response.json();
  } catch (err) {
    console.log(err);
    lessonPlans = [];
  }
  //Get only the free lesson plans.
  //To do: get the correct ids directly from an endpoint.
  lessonPlans = lessonPlans.filter((lessonPlan) => lessonPlan.id === "1");
  return lessonPlans;
}
export default async function TestThree() {
  const lessonPlanContents = await getLessonPlanContents();
  return <LessonPlanDynamic content={lessonPlanContents} />;
}
