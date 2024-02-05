import "server-only";
export async function fetchLessonPlans() {
  let lessonPlans;
  try {
    const response = await fetch("http://localhost:3001/lesson-plans"); // Used in place of a database.
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    lessonPlans = await response.json();
  } catch {
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    lessonPlans = [];
  }
  return lessonPlans;
}
