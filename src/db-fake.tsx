import { simpleDelay } from "./utils/delay";

let nextId = 4;
export const lessonPlanBookmarks = [
  {
    userId: "2",
    lessonPlanId: "3",
    id: 1,
  },
  {
    userId: "1",
    lessonPlanId: "2",
    id: 2,
  },
  {
    userId: "1",
    lessonPlanId: "1",
    id: 3,
  },
];

export async function getLessonPlanBookmarks() {
  await simpleDelay(1);
  return lessonPlanBookmarks;
}

export async function addLessonPlanBookmarks(
  userId: string,
  lessonPlanId: string
) {
  const newBookmark = {
    id: ++nextId,
  };
  await simpleDelay(1);
  return lessonPlanBookmarks;
}
