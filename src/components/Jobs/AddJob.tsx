"use client";
import { useFormState, useFormStatus } from "react-dom";
import { Box, TextField, Button, Stack } from "@mui/material";
import { createJob } from "@/actions/jobs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useFormClientStatus from "@/customHooks/useFormClientStatus";
const initialFormState: { message: string | null } = {
  message: null,
};

export function AddJob() {
  console.log("add job rendered");

  const [state, formAction] = useFormState(createJob, initialFormState);
  const [showJobTitle, setShowJobTitle] = useState<boolean>(false);
  const [showJobDescription, setShowJobDescription] = useState<boolean>(false);
  const jobTitleRef = useRef<null | HTMLInputElement>(null);
  const jobDescriptionRef = useRef<null | HTMLInputElement>(null);

  const inputRefs = useMemo(
    () =>
      new Map([
        ["jobTitle", jobTitleRef],
        ["jobDescription", jobDescriptionRef],
      ]),
    []
  );
  const inputRefsInfo = useFormClientStatus(new Map(inputRefs));

  console.log("***inputRefsInfo in AddJob");
  console.log(inputRefsInfo);

  const errorMessage = state?.message;
  const isError = false;

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
