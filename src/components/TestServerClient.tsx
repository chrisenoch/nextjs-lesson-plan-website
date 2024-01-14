import { selectAllJobs, selectFetchJobs } from "@/store";
import { useSelector } from "react-redux";
import LessonPlan from "./LessonPlans/LessonPlan";
export default function TestServerClient({
  title,
  summary,
  warmer,
  teachVocabulary,
  vocabularyExercises,
  teachSpeakingPhrases,
  rolePlay,
  feedback,
  plenary,
}: {
  title: string;
  summary: string;
  warmer: string;
  teachVocabulary: string;
  vocabularyExercises: string;
  teachSpeakingPhrases: string;
  rolePlay: string;
  feedback: string;
  plenary: string;
}) {
  const fetchJobsInfo: {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  } = useSelector(selectFetchJobs);

  const jobs:
    | { id: string; jobTitle: string; jobDescription: string; userId: string }[]
    | undefined = useSelector(selectAllJobs);

  return (
    <LessonPlan
      title={title}
      summary={summary}
      warmer={warmer}
      teachVocabulary={teachVocabulary}
      vocabularyExercises={vocabularyExercises}
      teachSpeakingPhrases={teachSpeakingPhrases}
      rolePlay={rolePlay}
      feedback={feedback}
      plenary={plenary}
      jobs={jobs}
    />
  );
}
