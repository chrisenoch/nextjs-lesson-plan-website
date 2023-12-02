"use client";
import { useFormState, useFormStatus } from "react-dom";
import { Box, TextField, Button } from "@mui/material";
import { createJob } from "@/actions/jobs";
import { useCallback, useEffect, useRef, useState } from "react";
import useFormClientStatus from "@/customHooks/useFormClientStatus";
const initialFormState: { message: string | null } = {
  message: null,
};

export function AddJob() {
  console.log("add job rendered");

  const [state, formAction] = useFormState(createJob, initialFormState);
  const [showJobTitle, setShowJobTitle] = useState<boolean>(false);
  const jobTitleRef = useRef<null | HTMLInputElement>(null);
  const [runJobTitleEventListeners, setRunJobTitleEventListeners] =
    useState<boolean>(false);

  const inputRefsInfo = useFormClientStatus(
    new Map([["jobTitle", jobTitleRef]])
  );

  console.log("job title ref");
  console.log(jobTitleRef);

  // const testRef = useCallback((jobTitleInputEle: HTMLInputElement) => {
  //   if (jobTitleInputEle !== null) {
  //     console.log("ref was mounted");
  //     console.log(jobTitleInputEle);
  //     setRunJobTitleEventListeners(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (runJobTitleEventListeners) {
  //   }
  //   console.log(testRef);

  //   jobTitleRef.current?.focus();
  //   console.log(jobTitleRef);
  //   jobTitleRef.current?.addEventListener("blur", () =>
  //     console.log("fired on blur event")
  //   );
  //   setRunJobTitleEventListeners(false);
  // }, [runJobTitleEventListeners]);

  const errorMessage = state?.message;
  const isError = false;

  return (
    <Box
      component="form"
      action={formAction}
      display={"flex"}
      flexDirection={"column"}
      gap={2}>
      <Button
        onClick={() => setShowJobTitle((t) => !t)}
        variant="contained"
        color="primary">
        Show Job title
      </Button>
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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} disabled={pending}>
      Add
    </button>
  );
}
