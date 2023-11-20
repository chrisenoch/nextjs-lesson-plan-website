"use client";

import { useMemo, useState } from "react";
import DisplayLessonPlans from "./DisplayLessonPlans";
import SearchLessonPlans from "./SearchLessonPlans";
import AutoCompleteMultiSelect from "../AutoCompleteMultiSelect";
import { LessonPlanType } from "../models/types/LessonPlanCategoryShort";
import { LessonPlan } from "../models/types/LessonPlan";
import { LessonPlanCategory } from "../models/types/LessonPlanCategory";
import { LessonPlanSubCategory } from "../models/types/LessonPlanSubcategory";

export default function SearchAndDisplayLessonPlans() {
  /***************************************** */
  // Design Decision

  // We use two arrays (lessonPlanTitlesBySubCategory and lessonPlans) for performance reasons. Using lessonPlanTitlesBySubCategory allows the user
  // to filter lesson plans in O(1) time instead of O(N) time.
  // This is important because if we have 2000 lesson plans, filtering them would be expensive with O(N) time.

  // We can prepare and sort lessonPlanTitlesBySubCategory and lessonPlans on the server and then use NextJS ISR and stale-while-revalidate to ensure
  // that the search filtering is as fast as possible for the user.

  /***************************************** */

  //We get these from the server
  //Depending on the value of the chip in the search field, we render the corresponding lesson plans
  const lessonPlanTitlesBySubCategory: Map<
    LessonPlanSubCategory,
    {
      title: string;
    }[]
  > = new Map([
    [
      "Speaking Class",
      [{ title: "Driverless Cars" }, { title: "Shopping For Clothes" }],
    ],
    ["Technology", [{ title: "Driverless Cars" }]],
    ["Second Conditional", [{ title: "Your Dream Holiday" }]],
    [
      "Video",
      [{ title: "The Founding of Hollywood" }, { title: "Driverless Cars" }],
    ],
    ["Role Play", [{ title: "Shopping For Clothes" }]],
    [
      "B1",
      [{ title: "Your Dream Holiday" }, { title: "Shopping For Clothes" }],
    ],
    ["B2", [{ title: "Driverless Cars" }]],
    ["C1", [{ title: "The Founding of Hollywood" }]],
  ]);

  //Get this from the server
  //Sort chips into the correct order server-side
  const lessonPlans: LessonPlan[] = [
    {
      title: "Driverless Cars",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia animi laudantium debitis rerum aperiam itaque quis vero tempore nemo tempora id et," +
        "voluptas deserunt reprehenderit repellat ullam, dolor neque reiciendis.",

      imageURL:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg",
      imageAlt: "A man driving a car",
      chips: [
        { title: "Speaking Class", category: "T" },
        { title: "Technology", category: "V" },
        { title: "Video", category: "A" },
        { title: "B2", category: "L" },
      ],
    },
    {
      title: "The Founding of Hollywood",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia animi laudantium debitis rerum aperiam itaque quis vero tempore nemo tempora id et," +
        "voluptas deserunt reprehenderit repellat ullam, dolor neque reiciendis.",
      imageURL:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/hollywood2.jpg",
      imageAlt: "Hollywood",
      chips: [
        { title: "Video", category: "A" },
        { title: "C1", category: "L" },
      ],
    },
    {
      title: "Your Dream Holiday",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia animi laudantium debitis rerum aperiam itaque quis vero tempore nemo tempora id et," +
        "voluptas deserunt reprehenderit repellat ullam, dolor neque reiciendis.",
      imageURL:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg",
      imageAlt: "A beach with palm trees",
      chips: [
        { title: "Second Conditional", category: "G" },
        { title: "B1", category: "L" },
      ],
    },
    {
      title: "Shopping For Clothes",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia animi laudantium debitis rerum aperiam itaque quis vero tempore nemo tempora id et," +
        "voluptas deserunt reprehenderit repellat ullam, dolor neque reiciendis.",
      imageURL:
        "https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg",
      imageAlt: "A woman with shopping bags full of clothes",
      chips: [
        { title: "Speaking Class", category: "T" },
        { title: "Role Play", category: "A" },
        { title: "B1", category: "L" },
      ],
    },
  ];

  const [selectedLessonPlanCategories, setSelectedLessonPlanCategories] =
    useState<{ title: string; category: LessonPlanCategory }[]>([]);

  //using useMemo as warned in MUI docs: https://mui.com/material-ui/react-autocomplete/#controlled-states
  const multiSelectOptionValues: {
    title: LessonPlanSubCategory;
    category: LessonPlanCategory;
  }[] = useMemo(
    () => [
      { title: "Conversation Class", category: "Type" },
      { title: "Speaking Class", category: "Type" },
      { title: "Listening Class", category: "Type" },
      { title: "Reading Class", category: "Type" },
      { title: "Writing Class", category: "Type" },
      { title: "Grammar Class", category: "Type" },
      { title: "First Conditional", category: "Grammar" },
      { title: "Second Conditional", category: "Grammar" },
      { title: "Technology", category: "Vocabulary" },
      { title: "Clothes / Fashion", category: "Vocabulary" },
      { title: "Travel / Holidays", category: "Vocabulary" },
      { title: "Films / Movies", category: "Vocabulary" },
      { title: "Video", category: "Activity" },
      { title: "Role Play", category: "Activity" },
      { title: "A1", category: "Level" },
      { title: "A2", category: "Level" },
      { title: "B1", category: "Level" },
      { title: "B2", category: "Level" },
      { title: "C1", category: "Level" },
      { title: "C2", category: "Level" },
    ],
    []
  );

  const lessonPlansToDisplay = filterLessonPlansIfFilter(
    selectedLessonPlanCategories,
    lessonPlans,
    lessonPlanTitlesBySubCategory
  );

  function updateSelectedLessonPlans(
    value: { title: string; category: LessonPlanCategory }[]
  ) {
    console.log("updateSelectedLessonPlans value");
    console.log(value);
    setSelectedLessonPlanCategories(value);
  }

  return (
    <>
      <SearchLessonPlans>
        {/* Avoiding prop drilling via SearchLessonPlans by using children */}
        <AutoCompleteMultiSelect
          optionValues={multiSelectOptionValues}
          selectedLessonPlanCategories={selectedLessonPlanCategories}
          updateSelectedLessonPlans={updateSelectedLessonPlans}
        />
      </SearchLessonPlans>
      <DisplayLessonPlans lessonPlans={lessonPlansToDisplay} />
    </>
  );
}

function filterLessonPlansIfFilter(
  selectedLessonPlanCategories: {
    title: string;
    category: LessonPlanCategory;
  }[],
  lessonPlans: {
    title: string;
    description: string;
    imageURL: string;
    imageAlt: string;
    chips: { title: string; category: LessonPlanType }[];
  }[],
  lessonPlanTitlesBySubCategory: Map<LessonPlanSubCategory, { title: string }[]>
) {
  let lessonPlansToDisplay;
  if (selectedLessonPlanCategories.length < 1) {
    lessonPlansToDisplay = lessonPlans;
  } else {
    const filteredLessonPlans = filterLessonPlans(
      selectedLessonPlanCategories,
      lessonPlanTitlesBySubCategory
    );
    lessonPlansToDisplay = lessonPlans.filter((lessonPlan) =>
      filteredLessonPlans.has(lessonPlan.title)
    );
  }
  return lessonPlansToDisplay;
}

function filterLessonPlans(
  selectedLessonPlanCategories: { title: string; category: string }[],
  lessonPlansByCategory: Map<string, { title: string }[]>
) {
  const lessonPlansToRender = new Set();
  selectedLessonPlanCategories.forEach((lessonPlanCategory) => {
    const lessonPlanItems = lessonPlansByCategory.get(lessonPlanCategory.title);
    lessonPlanItems?.forEach((lessonPlanItem) => {
      lessonPlansToRender.add(lessonPlanItem.title);
    });
  });
  return lessonPlansToRender;
}
