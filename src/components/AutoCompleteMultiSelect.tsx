"use client";

import { Search } from "@mui/icons-material";
import { Autocomplete, Chip, InputAdornment, TextField } from "@mui/material";
import { memo, useMemo } from "react";
import { LessonPlanCategory } from "@/models/types/LessonPlanCategory";

const AutoCompleteMultiSelect = memo(function AutoCompleteMultiSelect({
  selectedLessonPlanCategories,
  updateSelectedLessonPlans,
  optionValues,
}: {
  selectedLessonPlanCategories: {
    title: string;
    category: LessonPlanCategory;
  }[];
  updateSelectedLessonPlans: (
    value: {
      title: string;
      category: LessonPlanCategory;
    }[]
  ) => void;
  optionValues: {
    title: string;
    category: LessonPlanCategory;
  }[];
}) {
  const selectedValues = useMemo(() => {
    console.log("in useMemo");

    return selectedLessonPlanCategories;
  }, [selectedLessonPlanCategories]);
  return (
    <Autocomplete
      clearOnBlur={false}
      autoHighlight={true}
      clearText="Clear all filters"
      disableCloseOnSelect={true}
      multiple
      id="tags-outlined"
      options={optionValues.sort(sortOptionValues)}
      groupBy={(option) => option.category.toString()}
      value={selectedValues}
      onChange={(event, newValue) => {
        updateSelectedLessonPlans([...newValue]);
      }}
      filterSelectedOptions
      getOptionLabel={(option) => option.title}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.title}>
            🍇{option.title}
          </li>
        );
      }}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option.title}
            label={option.title}
          />
        ));
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          //   variant="standard"
          label="Find your lesson plan"
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "32px",

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "primary.main",
              },
            },

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
              borderWidth: "2px",
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  display: "none",
                }}>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
});

function sortOptionValues(
  a: { title: string; category: string },
  b: { title: string; category: string }
) {
  if (a.category.toLowerCase() === b.category.toLowerCase()) {
    return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
  }
  return a.category.toLowerCase() > b.category.toLowerCase() ? 1 : -1;
}

export default AutoCompleteMultiSelect;
