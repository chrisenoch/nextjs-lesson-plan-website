"use client";
import { Box, TextField, Button, Stack } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import useFormClientStatus from "@/customHooks/useFormClientStatus";
import { zodValidator } from "@/app/validation/zod-validator";
import {
  jobDescriptionValidator,
  jobTitleValidator,
} from "@/app/validation/jobs/jobs-validators";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, addJob, selectAddJob } from "@/store";
import { JobsPreview } from "./JobsPreview";
import useRedirectWhenLoggedOut from "@/customHooks/useRedirectWhenLoggedOut";
import useClearFormOnSuccess from "@/customHooks/useClearFormOnSuccess";
import useHideMessageOnNavAway from "@/customHooks/useHideMessageOnNavAway";

export function AddJob() {
  console.log("add job rendered");
  useRedirectWhenLoggedOut("/auth/signin");

  const jobTitleRef = useRef<null | HTMLInputElement>(null);
  const jobDescriptionRef = useRef<null | HTMLInputElement>(null);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");

  const inputRefs = useMemo(
    () =>
      new Map([
        ["jobTitle", jobTitleRef],
        ["jobDescription", jobDescriptionRef],
      ]),
    []
  );
  const {
    elementsStatus: status,
    resetAll,
    setAllToTouched,
  } = useFormClientStatus(inputRefs);

  const dispatch = useDispatch<AppDispatch>();
  const addJobInfo: null | {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  } = useSelector(selectAddJob);

  useClearFormOnSuccess(addJobInfo, clearForm);
  const shouldHideMessage = useHideMessageOnNavAway(addJobInfo);

  const jobTitleIsValid = zodValidator(jobTitle, {
    jobTitle: jobTitleValidator,
  });
  const jobDescriptionIsValid = zodValidator(jobDescription, {
    jobDescription: jobDescriptionValidator,
  });
  const isFormValid = jobTitleIsValid && jobDescriptionIsValid;

  function handleSubmit(e) {
    e.preventDefault();
    setAllToTouched();
    dispatch(addJob({ jobTitle, jobDescription }));
  }

  function clearForm() {
    setJobTitle("");
    setJobDescription("");
    resetAll();
  }

  return (
    <Box
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      component="form"
      display={"flex"}
      flexDirection={"column"}
      gap={2}>
      <TextField
        id="job-title"
        name="job-title"
        label="Job title"
        variant="outlined"
        inputRef={jobTitleRef}
        value={jobTitle}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setJobTitle(event.target.value);
        }}
        error={!jobTitleIsValid && status?.get("jobTitle")?.isTouched}
        helperText={
          !jobTitleIsValid &&
          (status?.get("jobTitle")?.hasBeenFocused ||
            status?.get("jobTitle")?.isTouched) &&
          "Insert two or more characters"
        }
      />
      <TextField
        id="job-description"
        name="job-description"
        label="Job Description"
        inputRef={jobDescriptionRef}
        value={jobDescription}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setJobDescription(event.target.value);
        }}
        error={
          !jobDescriptionIsValid && status?.get("jobDescription")?.isTouched
        }
        helperText={
          !jobDescriptionIsValid &&
          (status?.get("jobDescription")?.hasBeenFocused ||
            status?.get("jobDescription")?.isTouched) &&
          "Insert two or more characters"
        }
        multiline
        minRows={4}
      />

      <Button
        type="submit"
        disabled={addJobInfo?.isLoading || !isFormValid}
        variant="contained"
        color="primary">
        Add Job
      </Button>
      {!shouldHideMessage && addJobInfo?.message && (
        <Box
          component="p"
          color={addJobInfo?.isError ? "error.main" : "success.main"}
          aria-live="polite"
          role="status">
          {!shouldHideMessage && addJobInfo?.message}
        </Box>
      )}
      <JobsPreview />
    </Box>
  );
}
