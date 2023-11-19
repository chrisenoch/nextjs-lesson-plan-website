"use client";

import { Search } from "@mui/icons-material";
import { Autocomplete, Chip, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function AutoCompleteMultiSelect({
  selectedLessonPlanCategories,
  updateSelectedLessonPlans,
}) {
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
      value={selectedLessonPlanCategories}
      onChange={(event, newValue) => {
        console.log(event);
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
}

function sortOptionValues(
  a: { title: string; category: string },
  b: { title: string; category: string }
) {
  if (a.category.toLowerCase() === b.category.toLowerCase()) {
    return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
  }
  return a.category.toLowerCase() > b.category.toLowerCase() ? 1 : -1;
}

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
