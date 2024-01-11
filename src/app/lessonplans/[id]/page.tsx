import LessonPlan from "@/components/LessonPlanSearch/LessonPlan";

export async function generateStaticParams() {
  //get ids by calling a database or a server
  const ids = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
  return ids;
}

async function getLessonPlanContent(params: { id: string }) {
  console.log("inside getLessonPlanContent");
  let lessonPlans;

  try {
    const response = await fetch(
      `http://localhost:3001/lesson-plan-content/${params.id}`
    );
    if (!response.ok) {
      throw new Error("Unable to fetch lesson plans");
    }
    lessonPlans = await response.json();
  } catch (err) {
    console.log(err);
  }

  return lessonPlans;
}

export default async function LessonPlanContentPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("LessonPlanContentPagerendered");
  const lessonPlanContent: {
    title: string;
    summary: string;
    warmer: string;
    "teach-vocabulary": string;
    "vocabulary-exercises": string;
    "teach-speaking-phrases": string;
    "role-play": string;
    feedback: string;
    plenary: string;
  } = await getLessonPlanContent(params);

  return (
    <LessonPlan
      title={lessonPlanContent.title}
      summary={lessonPlanContent.summary}
      warmer={lessonPlanContent.warmer}
      teachVocabulary={lessonPlanContent["teach-vocabulary"]}
      vocabularyExercises={lessonPlanContent["vocabulary-exercises"]}
      teachSpeakingPhrases={lessonPlanContent["teach-speaking-phrases"]}
      rolePlay={lessonPlanContent["role-play"]}
      feedback={lessonPlanContent.feedback}
      plenary={lessonPlanContent.plenary}
    />
    // <>
    //   <p>{lessonPlanContent.title}</p>
    //   <p>{lessonPlanContent.summary}</p>
    //   <p>{lessonPlanContent.warmer}</p>
    //   <p>{lessonPlanContent["teach-vocabulary"]}</p>
    //   <p>{lessonPlanContent["teach-speaking-phrases"]}</p>
    //   <p>{lessonPlanContent["role-play"]}</p>
    //   <p>{lessonPlanContent.feedback}</p>
    //   <p>{lessonPlanContent.plenary}</p>
    // </>
  );
}