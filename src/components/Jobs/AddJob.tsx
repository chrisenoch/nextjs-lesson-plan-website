"use client";
import { faker } from "@faker-js/faker";
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
import { addJob } from "@/store";
import { JobsPreview } from "./JobsPreview";

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

  const dispatch = useDispatch();
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
  const jobs: { id: string; jobTitle: string; jobDescription: string }[] =
    useSelector((state) => {
      console.log("state object redux");
      console.log(state);
      return state.jobs;
    });

  async function fetchJobs() {
    const response = await fetch("http://localhost:3001/jobs");
    const jobs = await response.json();
    console.log(jobs);
  }

  //Used as an observer. Runs everytime the form server action returns a response to a form submission.
  useEffect(() => {
    if (formStateWithServer.emitter === null) {
      console.log("first time initialised " + formStateWithServer.emitter);
      return;
    }

    if (!formStateWithServer.isError && formStateWithServer.payload) {
      console.log("emitter id below: ");
      console.log(formStateWithServer.emitter);
      console.log("payload below");
      console.log(formStateWithServer.payload);
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
      {/* <p>{jobs[0]?.jobTitle}</p> */}
      <Stack direction={"row"} gap={2}>
        <Button onClick={fetchJobs} variant="contained" color="primary">
          Fetch Jobs
        </Button>
        {/* <Button
          onClick={() => handleJobAdd({ id: "1", title: "Programmer" })}
          variant="contained"
          color="primary">
          Add Job
        </Button> */}
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
      <JobsPreview jobs={jobs}></JobsPreview>
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
