import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import { renderWithAct } from "@/test-utils/render";
import DisplayLessonPlans from "@/components/lesson-plans/DisplayLessonPlans";
import { LessonPlanCardSummary } from "@/models/types/LessonPlans/LessonPlanCardSummary";
import { LessonPlanCategory } from "@/models/types/LessonPlans/LessonPlanCategory";

const filteredLessonPlans: LessonPlanCardSummary[] = [
  {
    id: "1",
    title: "Driverless Cars",
    duration: "90 mins",
    prepTime: "10 mins",
    level: "B1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia animi laudantium debitis rerum aperiam itaque quis vero tempore nemo tempora id et voluptas deserunt reprehenderit repellat ullam, dolor neque reiciendis.",
    isPremium: false,
    imageURL:
      "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
    imageAlt: "A man driving a car",
    chips: [
      {
        title: "Speaking Class",
        category: "T",
      },
      {
        title: "Technology",
        category: "V",
      },
      {
        title: "Video",
        category: "A",
      },
      {
        title: "B1",
        category: "L",
      },
    ],
  },
  {
    id: "2",
    title: "The Founding of Hollywood",
    duration: "60 mins",
    prepTime: "10 mins",
    level: "C1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia animi laudantium debitis rerum aperiam itaque quis vero tempore nemo tempora id et, voluptas deserunt reprehenderit repellat ullam, dolor neque reiciendis.",
    isPremium: true,
    imageURL:
      "https://raw.githubusercontent.com/chrisenoch/assets/main/hollywood2.jpg",
    imageAlt: "Hollywood",
    chips: [
      {
        title: "Films / Movies",
        category: "V",
      },
      {
        title: "Video",
        category: "A",
      },
      {
        title: "C1",
        category: "L",
      },
    ],
  },
  {
    id: "3",
    title: "Your Dream Holiday",
    duration: "60 mins",
    prepTime: "5 mins",
    level: "B2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia animi laudantium debitis rerum aperiam itaque quis vero tempore nemo tempora id et, voluptas deserunt reprehenderit repellat ullam, dolor neque reiciendis.",
    isPremium: true,
    imageURL:
      "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
    imageAlt: "A beach with palm trees",
    chips: [
      {
        title: "Travel / Holidays",
        category: "V",
      },
      {
        title: "Second Conditional",
        category: "G",
      },
      {
        title: "B2",
        category: "L",
      },
    ],
  },
  {
    id: "4",
    title: "Shopping For Clothes",
    duration: "90 mins",
    prepTime: "10 mins",
    level: "A2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia animi laudantium debitis rerum aperiam itaque quis vero tempore nemo tempora id et voluptas deserunt reprehenderit repellat ullam, dolor neque reiciendis.",
    isPremium: true,
    imageURL:
      "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
    imageAlt: "A woman with shopping bags full of clothes",
    chips: [
      {
        title: "Speaking Class",
        category: "T",
      },
      {
        title: "Clothes / Fashion",
        category: "V",
      },
      {
        title: "Role Play",
        category: "A",
      },
      {
        title: "A2",
        category: "L",
      },
    ],
  },
];

const selectedLessonPlanCategories: {
  title: string;
  category: LessonPlanCategory;
}[] = [
  {
    title: "A1",
    category: "Level",
  },
];

const bookmarks = [
  {
    userId: "2",
    lessonPlanId: "3",
    id: 3,
  },
  {
    userId: "1",
    lessonPlanId: "2",
    id: 4,
  },
  {
    userId: "1",
    lessonPlanId: "1",
    id: 5,
  },
];

describe("correct content should show", () => {
  test(`no-lesson-plans-to-display notification shows if
  - filteredLessonPlans.length < 1`, async () => {
    const fields = {
      totalLessonPlansBeforeFiltered: 0,
      filteredLessonPlans: [],
      selectedLessonPlanCategories: [],
      showLoadingSpinner: false,
      showOnlyBookmarkedLessonPlans: false,
      shouldRedirectWhenLogout: false,
      bookmarks: bookmarks,
    };
    await renderWithAct(<DisplayLessonPlans {...fields} />);
    const notificationBox = screen.queryByTestId(
      "noLessonPlansToDisplay"
    ) as HTMLDivElement;
    const lessonPlanCards = screen.queryAllByTestId(
      "lessonPlanCard"
    ) as HTMLDivElement[];
    expect(notificationBox).toBeInTheDocument();
    expect(lessonPlanCards.length).toBe(0);
  });
  test(`no-lesson-plans-to-display notification shows if:
  - filteredLessonPlans.length < 1 &&
  - selectedLessonPlanCategories.length > 0`, async () => {
    const fields = {
      totalLessonPlansBeforeFiltered: 0,
      filteredLessonPlans: [],
      selectedLessonPlanCategories: selectedLessonPlanCategories,
      showLoadingSpinner: false,
      showOnlyBookmarkedLessonPlans: false,
      shouldRedirectWhenLogout: false,
      bookmarks: bookmarks,
    };
    await renderWithAct(<DisplayLessonPlans {...fields} />);
    const notificationBox = screen.queryByTestId(
      "noLessonPlansToDisplay"
    ) as HTMLDivElement;
    const lessonPlanCards = screen.queryAllByTestId(
      "lessonPlanCard"
    ) as HTMLDivElement[];
    expect(notificationBox).toBeInTheDocument();
    expect(lessonPlanCards.length).toBe(0);
  });
  test(`show lesson plans if:
  - filteredLessonPlans.length > 0 `, async () => {
    const fields = {
      totalLessonPlansBeforeFiltered: filteredLessonPlans.length,
      filteredLessonPlans: filteredLessonPlans,
      selectedLessonPlanCategories: [],
      showLoadingSpinner: false,
      showOnlyBookmarkedLessonPlans: false,
      shouldRedirectWhenLogout: false,
      bookmarks: bookmarks,
    };
    await renderWithAct(<DisplayLessonPlans {...fields} />);
    const lessonPlanCards = screen.queryAllByTestId(
      "lessonPlanCard"
    ) as HTMLDivElement[];
    expect(lessonPlanCards.length).toBe(4);
  });
  test(`too-many-filters notification shows if:
  - filteredLessonPlans.length < 1 &&
  - selectedLessonPlanCategories.length > 0 &&
  - !showOnlyBookmarkedLessonPlans`, async () => {
    const fields = {
      totalLessonPlansBeforeFiltered: filteredLessonPlans.length,
      filteredLessonPlans: [],
      selectedLessonPlanCategories: selectedLessonPlanCategories,
      showLoadingSpinner: false,
      showOnlyBookmarkedLessonPlans: false,
      shouldRedirectWhenLogout: false,
      bookmarks: bookmarks,
    };
    await renderWithAct(<DisplayLessonPlans {...fields} />);
    const lessonPlanCards = screen.queryAllByTestId(
      "lessonPlanCard"
    ) as HTMLDivElement[];
    const notificationBox = screen.queryByTestId(
      "tooManyFilters"
    ) as HTMLDivElement;
    expect(lessonPlanCards.length).toBe(0);
    expect(notificationBox).toBeInTheDocument();
  });

  test(`too-many-filters notification shows if:
  - filteredLessonPlans.length < 1  &&
  - selectedLessonPlanCategories.length > 0  &&
  - showOnlyBookmarkedLessonPlans &&
  - bookmarks.length > 0`, async () => {
    const fields = {
      totalLessonPlansBeforeFiltered: filteredLessonPlans.length,
      filteredLessonPlans: [],
      selectedLessonPlanCategories: selectedLessonPlanCategories,
      showLoadingSpinner: false,
      showOnlyBookmarkedLessonPlans: true,
      shouldRedirectWhenLogout: false,
      bookmarks: bookmarks,
    };
    await renderWithAct(<DisplayLessonPlans {...fields} />);
    const lessonPlanCards = screen.queryAllByTestId(
      "lessonPlanCard"
    ) as HTMLDivElement[];
    const notificationBox = screen.queryByTestId(
      "tooManyFilters"
    ) as HTMLDivElement;
    expect(lessonPlanCards.length).toBe(0);
    expect(notificationBox).toBeInTheDocument();
  });

  test(`no-saved-lesson-plans notification shows if:
  - filteredLessonPlans.length < 1 &&
  - selectedLessonPlanCategories.length === 0 &&
  - showOnlyBookmarkedLessonPlans &&
  - bookmarks.length === 0`, async () => {
    const fields = {
      totalLessonPlansBeforeFiltered: filteredLessonPlans.length,
      filteredLessonPlans: [],
      selectedLessonPlanCategories: [],
      showLoadingSpinner: false,
      showOnlyBookmarkedLessonPlans: true,
      shouldRedirectWhenLogout: false,
      bookmarks: [],
    };
    await renderWithAct(<DisplayLessonPlans {...fields} />);
    const lessonPlanCards = screen.queryAllByTestId(
      "lessonPlanCard"
    ) as HTMLDivElement[];
    const notificationBox = screen.queryByTestId(
      "noSavedLessonPlans"
    ) as HTMLDivElement;
    expect(lessonPlanCards.length).toBe(0);
    expect(notificationBox).toBeInTheDocument();
  });

  test(`no-saved-lesson-plans notification shows if:
  - filteredLessonPlans.length > 0  &&
  - selectedLessonPlanCategories.length === 0  &&
  - showOnlyBookmarkedLessonPlans  &&
  - bookmarks.length === 0`, async () => {
    const fields = {
      totalLessonPlansBeforeFiltered: filteredLessonPlans.length,
      filteredLessonPlans: filteredLessonPlans,
      selectedLessonPlanCategories: [],
      showLoadingSpinner: false,
      showOnlyBookmarkedLessonPlans: true,
      shouldRedirectWhenLogout: false,
      bookmarks: [],
    };
    await renderWithAct(<DisplayLessonPlans {...fields} />);
    const lessonPlanCards = screen.queryAllByTestId(
      "lessonPlanCard"
    ) as HTMLDivElement[];
    const notificationBox = screen.queryByTestId(
      "noSavedLessonPlans"
    ) as HTMLDivElement;
    expect(lessonPlanCards.length).toBe(0);
    expect(notificationBox).toBeInTheDocument();
  });
});
