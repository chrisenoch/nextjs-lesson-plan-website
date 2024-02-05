import "server-only";
export async function fetchLessonPlans() {
  let lessonPlans;
  try {
    const response = await fetch("http://localhost:3001/lesson-plans"); // Used in place of a database.
    lessonPlans = await response.json();
  } catch {
    lessonPlans = [];
  } finally {
    //await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return lessonPlans;
}
