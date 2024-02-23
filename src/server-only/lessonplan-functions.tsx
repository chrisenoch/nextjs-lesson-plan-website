import "server-only";
import { firebaseGETCollection } from "./route-functions";

export async function fetchLessonPlanCardSummaries() {
  const payload = await firebaseGETCollection(
    `${process.env.FIREBASE_DB_URL}/lesson-plan-card-summary.json`,
    "Successfully fetched lesson plans",
    "Unable to fetch lesson plans."
  );
  if (payload.isError) {
    return [];
  }
  return payload.collection;
}

export async function getLessonPlanContents() {
  const fetchLessonPlansPayload = await firebaseGETCollection(
    `${process.env.FIREBASE_DB_URL}/lesson-plans-content.json`,
    "Successfully fetched lesson plan contents.",
    "Unable to fetch lesson plan contents."
  );

  if (fetchLessonPlansPayload.isError) {
    return [];
  }

  return fetchLessonPlansPayload.collection;
}
