//import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/dom";
import { AddJob } from "@/components/Jobs/AddJob";
import { render } from "@/test-utils/render";
import userEvent from "@testing-library/user-event";
import { simpleDelay } from "@/utils/delay";
import { act } from "@testing-library/react";
import DisplayLessonPlans from "@/components/LessonPlans/DisplayLessonPlans";
import { LessonPlanCardSummary } from "@/models/types/LessonPlans/LessonPlanCardSummary";
import { LessonPlanCategory } from "@/models/types/LessonPlans/LessonPlanCategory";

const lessonPlans: LessonPlanCardSummary[] = [
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

describe("correct content should show", () => {
  test("no-lesson-plans-to-display notification shows if there no lesson plans", async () => {
    const fields = {
      totalLessonPlansBeforeFiltered: 0,
      filteredLessonPlans: [],
      selectedLessonPlanCategories: [],
      showLoadingSpinner: false,
      showOnlyBookmarkedLessonPlans: false,
      shouldRedirectWhenLogout: false,
    };
    render(<DisplayLessonPlans {...fields} />);
    const notificationBox = screen.queryByTestId(
      "noLessonPlansToDisplay"
    ) as HTMLDivElement;
    const lessonPlanCards = screen.queryAllByTestId(
      "lessonPlanCard"
    ) as HTMLDivElement[];
    expect(notificationBox).toBeInTheDocument();
    expect(lessonPlanCards.length).toBe(0);
  });
  test("show lesson plans if there are lesson-plans-to-display ", async () => {
    const fields = {
      totalLessonPlansBeforeFiltered: lessonPlans.length,
      filteredLessonPlans: lessonPlans,
      selectedLessonPlanCategories: [],
      showLoadingSpinner: false,
      showOnlyBookmarkedLessonPlans: false,
      shouldRedirectWhenLogout: false,
    };
    render(<DisplayLessonPlans {...fields} />);
    const lessonPlanCards = screen.queryAllByTestId(
      "lessonPlanCard"
    ) as HTMLDivElement[];
    expect(lessonPlanCards.length).toBe(4);
  });
  test(`too-many-filters notification shows if no lesson plans match the filters and 
  selectedLessonPlanCategories.length > 0 && !showOnlyBookmarkedLessonPlans`, async () => {
    const fields = {
      totalLessonPlansBeforeFiltered: lessonPlans.length,
      filteredLessonPlans: [],
      selectedLessonPlanCategories: selectedLessonPlanCategories,
      showLoadingSpinner: false,
      showOnlyBookmarkedLessonPlans: false,
      shouldRedirectWhenLogout: false,
    };
    render(<DisplayLessonPlans {...fields} />);
    const lessonPlanCards = screen.queryAllByTestId(
      "lessonPlanCard"
    ) as HTMLDivElement[];
    const notificationBox = screen.queryByTestId(
      "tooManyFilters"
    ) as HTMLDivElement;
    expect(lessonPlanCards.length).toBe(0);
    expect(notificationBox).toBeInTheDocument();
  });

  // test(`too-many-filters notification shows if if no lesson plans match the filters and
  // selectedLessonPlanCategories.length > 0 &&
  // showOnlyBookmarkedLessonPlans &&
  // bookmarks.length > 0`, async () => {
  //   const fields = {
  //     totalLessonPlansBeforeFiltered: lessonPlans.length,
  //     filteredLessonPlans: [],
  //     selectedLessonPlanCategories: selectedLessonPlanCategories,
  //     showLoadingSpinner: false,
  //     showOnlyBookmarkedLessonPlans: true,
  //     shouldRedirectWhenLogout: false,
  //   };
  //   render(<DisplayLessonPlans {...fields} />);
  //   const lessonPlanCards = screen.queryAllByTestId(
  //     "lessonPlanCard"
  //   ) as HTMLDivElement[];
  //   const notificationBox = screen.queryByTestId(
  //     "tooManyFilters"
  //   ) as HTMLDivElement;
  //   expect(lessonPlanCards.length).toBe(0);
  //   expect(notificationBox).toBeInTheDocument();
  // });
});
