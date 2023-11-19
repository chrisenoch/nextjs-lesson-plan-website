"use client";

import { useState } from "react";
import DisplayLessonPlans from "./DisplayLessonPlans";
import SearchLessonPlans from "./SearchLessonPlans";
import AutoCompleteMultiSelect from "../AutoCompleteMultiSelect";

export default function SearchAndDisplayLessonPlans() {
  //We get these from the server
  //Depending on the value of the chip, we render the corresponding lesson plans
  const lessonPlans = new Map([
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

  //Need the value so can inform Display lesson plans
  const [selectedLessonPlanCategories, setSelectedLessonPlanCategories] =
    useState<{ title: string; category: string }[]>([]);
  console.log(selectedLessonPlanCategories);

  //decide which lesson plans to render - extract to function
  let lessonPlanItems;
  const lessonPlansToRender = new Set();
  selectedLessonPlanCategories.forEach((lessonPlanCategory) => {
    lessonPlanItems = lessonPlans.get(lessonPlanCategory.title);
    lessonPlanItems?.forEach((lessonPlanItem) => {
      lessonPlansToRender.add(lessonPlanItem.title);
    });
  });
  console.log("lesson plans to render");
  console.log(lessonPlansToRender);

  const optionValues = [
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
  ];

  function updateSelectedLessonPlans(value) {
    setSelectedLessonPlanCategories(value);
  }

  return (
    <>
      <SearchLessonPlans>
        <AutoCompleteMultiSelect
          optionValues={optionValues}
          selectedLessonPlanCategories={selectedLessonPlanCategories}
          updateSelectedLessonPlans={updateSelectedLessonPlans}
        />
      </SearchLessonPlans>
      <DisplayLessonPlans />
    </>
  );
}
