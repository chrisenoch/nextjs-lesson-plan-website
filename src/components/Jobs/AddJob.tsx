"use client";
import { useFormState, useFormStatus } from "react-dom";
import { Box, TextField, Button, Stack } from "@mui/material";
import { createJob } from "@/actions/jobs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useFormClientStatus from "@/customHooks/useFormClientStatus";
const initialFormState: { message: string | null } = {
  message: null,
};
import { z } from "zod";

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
  const inputRefsInfo = useFormClientStatus(new Map(inputRefs));
  const errorMessage = state?.message;
  const isError = false;

  console.log("***inputRefsInfo in AddJob");
  console.log(inputRefsInfo);

  const jobTitleSchema = z.object({
    jobTitle: z.string().min(2),
  });
  const jobDescriptionSchema = z.object({
    jobDescription: z.string().min(2),
  });

  if (jobTitleRef.current !== null) {
    const parse = jobTitleSchema.safeParse({
      jobTitle: jobTitleRef.current.value,
    });

    if (!parse.success) {
      console.log("jobTitle is invalid");
    } else {
      console.log("jobTitle is valid");
    }
  }

  if (jobDescriptionRef.current !== null) {
    const parse = jobDescriptionSchema.safeParse({
      jobDescription: jobDescriptionRef.current.value,
    });

    if (!parse.success) {
      console.log("jobDescription is invalid");
    } else {
      console.log("jobDescription is valid");
    }
  }

  return (
    <Box
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
        <Button
          onClick={() => inputRefsInfo.resetAll()}
          variant="contained"
          color="primary">
          ResetAll
        </Button>
        <Button
          onClick={() => inputRefsInfo.resetElement("jobTitle")}
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
          error={isError}
          helperText={
            errorMessage && (
              <>
                <p>{errorMessage}</p>
              </>
            )
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
          multiline
          minRows={4}
        />
      )}

      <SubmitButton />
      <p aria-live="polite" role="status">
        {state?.message}
      </p>
    </Box>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} disabled={pending}>
      Add
    </button>
  );
}
