"use client";
import { useFormState, useFormStatus } from "react-dom";
import { Box, TextField } from "@mui/material";
import { createJob } from "@/actions/jobs";
const initialFormState: { message: string | null } = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} disabled={pending}>
      Add
    </button>
  );
}

export function AddJob() {
  const [state, formAction] = useFormState(createJob, initialFormState);

  const errorMessage = "";
  const isError = false;

  return (
    <Box
      component="form"
      action={formAction}
      display={"flex"}
      flexDirection={"column"}
      gap={2}>
      <TextField
        id="job-title"
        name="job-title"
        label="Job title"
        variant="outlined"
        error={isError}
        helperText={
          errorMessage && (
            <>
              <p>{errorMessage}</p>
            </>
          )
        }
      />
      <TextField
        id="job-description"
        name="job-description"
        label="Job Description"
        multiline
        minRows={4}
      />
      <SubmitButton />
      <p aria-live="polite" role="status">
        {state?.message}
      </p>
    </Box>
  );
}
