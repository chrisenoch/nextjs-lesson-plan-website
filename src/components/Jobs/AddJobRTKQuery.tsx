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
import { AppDispatch, addJob, fetchJobs } from "@/store";
import { JobsPreview } from "./JobsPreview";
import { selectAllJobs } from "@/store/slices/with-thunks/jobs-slice";
import {
  useAddNewJobMutation,
  useGetJobsQuery,
} from "@/store/slices/with-rtk-query/api/internal-api-slice";
import { JobsPreviewRTKQuery } from "./JobsPreviewRTKQuery";

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

export function AddJobRTKQuery() {
  console.log("add job rtk query rendered");

  const {
    data: jobs = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetJobsQuery();
  const [addNewJob, { isLoading: isAddJobLoading }] = useAddNewJobMutation();

  const [showJobTitle, setShowJobTitle] = useState<boolean>(true);
  const [showJobDescription, setShowJobDescription] = useState<boolean>(true);
  const jobTitleRef = useRef<null | HTMLInputElement>(null);
  const jobDescriptionRef = useRef<null | HTMLInputElement>(null);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");

  const [addJobStatus, setAddJobStatus] = useState<{
    status: "ERROR" | "SUCCESS" | undefined;
    message: undefined | string;
  }>({
    status: undefined,
    message: undefined,
  });

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

  const jobTitleIsValid = zodValidator(jobTitle, {
    jobTitle: jobTitleValidator,
  });
  const jobDescriptionIsValid = zodValidator(jobDescription, {
    jobDescription: jobDescriptionValidator,
  });
  const isFormValid = jobTitleIsValid && jobDescriptionIsValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAllToTouched();
    console.log("print event obj");
    console.log(e);

    if (isFormValid) {
      try {
        await addNewJob({ jobTitle, jobDescription }).unwrap();
        resetAll();
        setJobTitle("");
        setJobDescription("");
        setAddJobStatus({
          status: "SUCCESS",
          message: jobTitle + " Job added successfully.",
        });
      } catch (err) {
        console.error("Failed to save the job: ", err);
        setAddJobStatus({
          status: "ERROR",
          message:
            "Error: Unable to add job. Please try again or contact our support team.",
        });
      }
    } else {
      setAddJobStatus({
        status: "ERROR",
        message:
          "Error: Failed to create job. Ensure you insert the correct form values.",
      });
    }
  };

  return (
    <Box
      onSubmit={handleSubmit}
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
      {addJobStatus.status && (
        <Box
          component="p"
          color={
            addJobStatus.status === "ERROR" ? "error.main" : "success.main"
          }
          aria-live="polite"
          role="status">
          {addJobStatus.message}
        </Box>
      )}
      <JobsPreviewRTKQuery
        jobs={jobs}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}></JobsPreviewRTKQuery>
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
