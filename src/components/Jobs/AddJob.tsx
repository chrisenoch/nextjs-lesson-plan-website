"use client";
import { useFormState, useFormStatus } from "react-dom";
import { Box, TextField, Button, Stack } from "@mui/material";
import { createJob } from "@/actions/jobs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useFormClientStatus from "@/customHooks/useFormClientStatus";
import { ZodEffects, ZodString, z } from "zod";

const initialFormState: { message: string | null; isError: boolean } = {
  message: null,
  isError: false,
};

export function AddJob() {
  console.log("add job rendered");

  const [state, formAction] = useFormState(createJob, initialFormState);
  const [showJobTitle, setShowJobTitle] = useState<boolean>(false);
  const [showJobDescription, setShowJobDescription] = useState<boolean>(false);
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
  const errorMessageFromServer = state?.message;

  console.log("***inputRefsInfo in AddJob");
  console.log(status);

  const jobTitleIsValid = zodValidator(jobTitle, {
    jobTitle: z.string().min(2),
  });

  const jobDescriptionIsValid = zodValidator(jobDescription, {
    jobDescription: z.string().min(2),
  });

  const isFormValid = jobTitleIsValid && jobDescriptionIsValid;

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
      {errorMessageFromServer && (
        <Box
          component="p"
          color={state.isError ? "error.main" : "success.main"}
          aria-live="polite"
          role="status">
          {errorMessageFromServer}
        </Box>
      )}
    </Box>
  );
}

function SubmitButton({ formIsValid }: { formIsValid?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending || !formIsValid}
      disabled={pending || !formIsValid}>
      Add
    </button>
  );
}

function zodValidator(
  valueToValidate: string,
  validator: {
    [key: string]: z.ZodString | ZodEffects<ZodString, string, string>;
  },
  shouldTrim: boolean = true
) {
  if (Object.keys(validator).length > 1) {
    console.error(
      "Only one key should be passed to the validator object. Extra keys will be ignored."
    );
  }

  if (shouldTrim) {
    valueToValidate = valueToValidate.trim();
  }

  return z.object(validator).safeParse({
    [Object.keys(validator)[0]]: valueToValidate,
  }).success;
}
