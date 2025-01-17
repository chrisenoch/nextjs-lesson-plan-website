"use client";

import { useCallback, useMemo, useState } from "react";
import SearchLessonPlans from "./SearchLessonPlans";
import AutoCompleteMultiSelect from "../forms-c/AutoCompleteMultiSelect";
import { LessonPlanCategory } from "@/models/types/LessonPlans/LessonPlanCategory";
import { LessonPlanSubCategory } from "@/models/types/LessonPlans/LessonPlanSubCategory";
import { SxProps, Theme } from "@mui/material";
import DisplayLessonPlans from "./DisplayLessonPlans";
import { LessonPlanCardSummary } from "@/models/types/LessonPlans/LessonPlanCardSummary";
import { useAppSelector } from "@/store/hooks";
import { selectAllBookmarks } from "@/store";

export default function SearchAndDisplayLessonPlans({
  lessonPlans,
  searchTitle,
  showLoadingSpinner,
  showOnlyBookmarkedLessonPlans,
  shouldRedirectWhenLogout,
  sxSearchLessonPlansOuterContainer,
  sxSearchLessonPlansInnerContainer,
  sxSearchLessonPlansTitle,
}: {
  lessonPlans: LessonPlanCardSummary[];
  searchTitle: string;
  showLoadingSpinner: boolean;
  showOnlyBookmarkedLessonPlans: boolean;
  shouldRedirectWhenLogout: boolean;
  sxSearchLessonPlansOuterContainer?: SxProps<Theme>;
  sxSearchLessonPlansInnerContainer?: SxProps<Theme>;
  sxSearchLessonPlansTitle?: SxProps<Theme>;
}) {
  const [selectedLessonPlanCategories, setSelectedLessonPlanCategories] =
    useState<{ title: string; category: LessonPlanCategory }[]>([]);

  const bookmarks: {
    userId: string;
    lessonPlanId: string;
  }[] = useAppSelector(selectAllBookmarks);

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

  const filteredLessonPlans = filterLessonPlans(
    lessonPlans,
    selectedLessonPlanCategories
  );

  const updateSelectedLessonPlans = useCallback(
    (value: { title: string; category: LessonPlanCategory }[]) => {
      setSelectedLessonPlanCategories(value);
    },
    []
  );

  return (
    <>
      <SearchLessonPlans
        searchTitle={searchTitle}
        sxOuterContainer={sxSearchLessonPlansOuterContainer}
        sxInnerContainer={sxSearchLessonPlansInnerContainer}
        sxTitle={sxSearchLessonPlansTitle}>
        {/* Avoiding prop drilling via SearchLessonPlans by using children */}
        <AutoCompleteMultiSelect
          optionValues={multiSelectOptionValues}
          selectedLessonPlanCategories={selectedLessonPlanCategories}
          updateSelectedLessonPlans={updateSelectedLessonPlans}
        />
      </SearchLessonPlans>
      <DisplayLessonPlans
        totalLessonPlansBeforeFiltered={lessonPlans.length}
        filteredLessonPlans={filteredLessonPlans}
        selectedLessonPlanCategories={selectedLessonPlanCategories}
        showLoadingSpinner={showLoadingSpinner}
        showOnlyBookmarkedLessonPlans={showOnlyBookmarkedLessonPlans}
        shouldRedirectWhenLogout={shouldRedirectWhenLogout}
        bookmarks={bookmarks}
      />
    </>
  );
}

function filterLessonPlans(
  lessonPlans: LessonPlanCardSummary[],
  selectedLessonPlanCategories: {
    title: string;
    category: LessonPlanCategory;
  }[]
) {
  const selectedLessonPlanTitles = new Set<string>();
  selectedLessonPlanCategories.forEach((selectedCategory) => {
    selectedLessonPlanTitles.add(selectedCategory.title);
  });

  const selectedLessonPlanTitlesArr = Array.from(selectedLessonPlanTitles);
  const filteredLessonPlans: LessonPlanCardSummary[] = [];
  lessonPlans.forEach((lessonPlan) => {
    const chipTitles = new Set<string>();
    lessonPlan.chips.forEach((chip) => {
      chipTitles.add(chip.title);
    });
    const chipTitlesArr = Array.from(chipTitles);
    const commonTitles = selectedLessonPlanTitlesArr.filter((title) => {
      return chipTitlesArr.includes(title);
    });

    if (selectedLessonPlanTitlesArr.length === commonTitles.length) {
      filteredLessonPlans.push(lessonPlan);
    }
  });

  return filteredLessonPlans;
}
