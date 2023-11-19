"use client";

import { Search } from "@mui/icons-material";
import { Autocomplete, Chip, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function AutoCompleteMultiSelect() {
  // const [value, setValue] = useState<{ title: string; year: number }[]>([]);
  const [value, setValue] = useState<{ title: string; category: string }[]>([]);
  console.log(value);

  //Depending on the value of the chip, we render those lesson plans
  //1. render them in console
  //2. Lift state up and handle from common parent
  const lessonPlans = new Map([
    [
      "speaking",
      [{ title: "Driverless Cars" }, { title: "Shopping For Clothes" }],
    ],
    ["technology", [{ title: "Driverless Cars" }]],
    ["second conditional", [{ title: "Your Dream Holiday" }]],
    [
      "video",
      [{ title: "The Founding of Hollywood" }, { title: "Driverless Cars" }],
    ],
    ["role play", [{ title: "Shopping For Clothes" }]],
  ]);

  return (
    <Autocomplete
      //   open={true}
      clearOnBlur={false}
      autoHighlight={true}
      clearText="Clear all filters"
      disableCloseOnSelect={true}
      multiple
      id="tags-outlined"
      options={optionValues.sort()}
      groupBy={(option) => option.category.toString()}
      value={value}
      onChange={(event, newValue) => {
        console.log(event);
        setValue([...newValue]);
      }}
      onInputChange={(event, value, reason) => {
        // console.log("onInputchange value");
        // console.log(value);
        // console.log(event);
        // console.log(reason);
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
              // border: "2px solid lightgreen",
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

//Later, related tags, e.g. if search for movies films should show.
//if search for travel holidays should show
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
  { title: "Video", category: "Media" },
  { title: "Role Play", category: "Activity" },
  { title: "Debate", category: "Activity" },
];
