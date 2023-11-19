"use client";

import { useMemo, useState } from "react";
import DisplayLessonPlans from "./DisplayLessonPlans";
import SearchLessonPlans from "./SearchLessonPlans";
import AutoCompleteMultiSelect from "../AutoCompleteMultiSelect";
import { Button } from "@mui/material";

export default function SearchAndDisplayLessonPlans() {
  //We get these from the server
  //Depending on the value of the chip, we render the corresponding lesson plans
  const lessonPlansByCategoryToFilter = new Map([
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

  //get this from the server
  //Sort chips into the correct order server-side
  const lessonPlansByTitleToDisplay = [
    {
      heading: "Driverless Cars",
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
      heading: "The Founding of Hollywood",
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
      heading: "Your Dream Holiday",
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
      heading: "Shopping For Clothes",
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
    useState<{ title: string; category: string }[]>([]);

  const optionValues = useMemo(
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

  console.log(selectedLessonPlanCategories);

  //decide which lesson plans to render - extract to function
  let lessonPlanItems;
  const lessonPlansToRender = new Set();
  selectedLessonPlanCategories.forEach((lessonPlanCategory) => {
    lessonPlanItems = lessonPlansByCategoryToFilter.get(
      lessonPlanCategory.title
    );
    lessonPlanItems?.forEach((lessonPlanItem) => {
      lessonPlansToRender.add(lessonPlanItem.title);
    });
  });
  console.log("lesson plans to render");
  console.log(lessonPlansToRender);

  function updateSelectedLessonPlans(value) {
    setSelectedLessonPlanCategories(value);
  }

  return (
    <>
      <SearchLessonPlans>
        {/* Avoiding prop drilling via SearchLessonPlans by using children */}
        <AutoCompleteMultiSelect
          optionValues={optionValues}
          selectedLessonPlanCategories={selectedLessonPlanCategories}
          updateSelectedLessonPlans={updateSelectedLessonPlans}
        />
      </SearchLessonPlans>
      <DisplayLessonPlans lessonPlanItems={lessonPlansByTitleToDisplay} />
    </>
  );
}
