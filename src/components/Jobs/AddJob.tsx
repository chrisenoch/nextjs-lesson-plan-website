"use client";
import { useFormState, useFormStatus } from "react-dom";
import { Box, TextField, Button, Stack } from "@mui/material";
import { createJob } from "@/actions/jobs";
import { useEffect, useMemo, useRef, useState } from "react";
import useFormClientStatus from "@/customHooks/useFormClientStatus";
import { zodValidator } from "@/app/validation/zod-validator";
import {
  jobDescriptionValidator,
  jobTitleValidator,
} from "@/app/validation/jobs/jobs-validators";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  addJob,
  deleteJob,
  selectAllJobs,
  selectJobsByUserId,
  selectJobsError,
  selectJobsIsLoading,
  selectAddJobResponse,
  selectUserInfo,
} from "@/store";
import { JobsPreview } from "./JobsPreview";
import { SerializedError } from "@reduxjs/toolkit";
import { UserInfo } from "@/models/types/UserInfo";

export function AddJob() {
  console.log("add job rendered");

  const [showJobTitle, setShowJobTitle] = useState<boolean>(true);
  const [showJobDescription, setShowJobDescription] = useState<boolean>(true);
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
    resetElement,
    setAllToTouched,
  } = useFormClientStatus(inputRefs);

  const dispatch = useDispatch<AppDispatch>();
  const userInfo: null | UserInfo = useSelector(selectUserInfo);
  const userInfoId = userInfo?.id;
  const addJobResponse: null | {
    message: string;
    isError: boolean;
  } = useSelector(selectAddJobResponse);

  const jobs:
    | { id: string; jobTitle: string; jobDescription: string; userId: string }[]
    | undefined = useSelector((state) => selectJobsByUserId(state, userInfoId));

  const jobsIsLoading: boolean = useSelector(selectJobsIsLoading);
  const jobsError: null | SerializedError = useSelector(selectJobsError);

  const jobTitleIsValid = zodValidator(jobTitle, {
    jobTitle: jobTitleValidator,
  });
  const jobDescriptionIsValid = zodValidator(jobDescription, {
    jobDescription: jobDescriptionValidator,
  });
  const isFormValid = jobTitleIsValid && jobDescriptionIsValid;

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addJob({ jobTitle, jobDescription }));
  }

  function handleJobDelete(id: string) {
    dispatch(deleteJob(id));
  }

  return (
    <Box
      onSubmit={(e) => {
        setAllToTouched();
        handleSubmit(e);
      }}
      component="form"
      display={"flex"}
      flexDirection={"column"}
      gap={2}>
      <Stack direction={"row"} gap={2}>
        <Button
          onClick={() => setShowJobTitle((t) => !t)}
          variant="contained"
          color="primary">
          Show Job title
        </Button>
        <Button
          onClick={() => setShowJobDescription((d) => !d)}
          variant="contained"
          color="primary">
          Show Job description
        </Button>
        <Button onClick={() => resetAll()} variant="contained" color="primary">
          ResetAll
        </Button>
        <Button
          onClick={() => resetElement("jobTitle")}
          variant="contained"
          color="primary">
          Reset Job title
        </Button>
      </Stack>
      {showJobTitle && (
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
      )}
      {showJobDescription && (
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
      )}

      <SubmitButton formIsValid={isFormValid} />
      {addJobResponse?.message && (
        <Box
          component="p"
          color={addJobResponse?.isError ? "error.main" : "success.main"}
          aria-live="polite"
          role="status">
          {addJobResponse.message}
        </Box>
      )}
      <JobsPreview
        jobs={jobs}
        isLoading={jobsIsLoading}
        error={jobsError}
        handleJobDelete={handleJobDelete}></JobsPreview>
    </Box>
  );
}

function SubmitButton({ formIsValid }: { formIsValid?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      // aria-disabled={pending || !formIsValid}
      // disabled={pending || !formIsValid}
    >
      Add
    </button>
  );
}
