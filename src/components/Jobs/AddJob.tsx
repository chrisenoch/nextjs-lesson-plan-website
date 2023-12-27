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
} from "@/store";
import { JobsPreview } from "./JobsPreview";
import { SerializedError } from "@reduxjs/toolkit";
import { fetchJobsByUserId } from "@/store/slices/with-thunks/jobs-slice";

const initialFormState: {
  message: string | null;
  isError: boolean;
  emitter: any[] | null;
  payload?: { jobTitle: string; jobDescription: string };
} = {
  message: null,
  isError: false,
  emitter: null,
};

export function AddJob() {
  console.log("add job rendered");

  const [formStateWithServer, formAction] = useFormState(
    createJob,
    initialFormState
  );
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
  const jobs:
    | { id: string; jobTitle: string; jobDescription: string }[]
    | undefined = useSelector(selectJobsByUserId);
  // const jobs:
  //   | { id: string; jobTitle: string; jobDescription: string }[]
  //   | undefined = useSelector(selectAllJobs);
  console.log("jobs selectAllJobsByUserId ");
  console.log(jobs);
  const jobsIsLoading: boolean = useSelector(selectJobsIsLoading);
  console.log("jobsIsLoading " + jobsIsLoading);

  const jobsError: null | SerializedError = useSelector(selectJobsError);
  console.log("jobsError " + jobsError);
  const resultMessageFromServer = formStateWithServer?.message;
  const jobTitleIsValid = zodValidator(jobTitle, {
    jobTitle: jobTitleValidator,
  });
  const jobDescriptionIsValid = zodValidator(jobDescription, {
    jobDescription: jobDescriptionValidator,
  });
  const isFormValid = jobTitleIsValid && jobDescriptionIsValid;

  const handleJobAdd = (job: { jobTitle: string; jobDescription: string }) => {
    dispatch(addJob(job));
  };

  function handleJobDelete(id: string) {
    dispatch(deleteJob(id));
  }

  useEffect(() => {
    dispatch(fetchJobsByUserId());
  });

  // Used as an observer. Runs everytime the form server action returns a response to the add-job form submission.
  // formStateWithServer.emitter only changes when a form response arrives
  // As I am using Redux, in reality I would add the job using an async thunk and not do this. However, I started off learning about NextJS server actions.
  // I am adding the job to redux state when the job has successfully been added via the NextJS server action. I couldn't find a native way to listen
  // to when the server action was complete so I chose this solution.
  // I wouldn't do it like this though. I would use redux async thunks, like I did for the login page.
  useEffect(() => {
    if (formStateWithServer.emitter === null) {
      return;
    }

    if (!formStateWithServer.isError && formStateWithServer.payload) {
      handleJobAdd(formStateWithServer.payload);
    }
  }, [formStateWithServer.emitter]);

  return (
    <Box
      onSubmit={() => setAllToTouched()}
      component="form"
      action={formAction}
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
      {resultMessageFromServer && (
        <Box
          component="p"
          color={formStateWithServer.isError ? "error.main" : "success.main"}
          aria-live="polite"
          role="status">
          {resultMessageFromServer}
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
