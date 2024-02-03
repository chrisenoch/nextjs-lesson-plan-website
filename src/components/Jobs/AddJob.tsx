"use client";
import { Box, TextField, Button, Stack, Skeleton } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import useFormClientStatus from "@/customHooks/useFormClientStatus";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  addJob,
  deleteJob,
  selectAddJob,
  selectFetchJobs,
  selectJobsByUserId,
} from "@/store";
import { JobsPreview } from "./JobsPreview";
import useRedirectWhenLoggedOut from "@/customHooks/useRedirectWhenLoggedOut";
import useClearFormOnSuccess from "@/customHooks/useClearFormOnSuccess";
import useHideMessageOnNavAway from "@/customHooks/useHideMessageOnNavAway";
import { zodValidator } from "@/validation/zod-validator";
import {
  jobDescriptionValidator,
  jobTitleValidator,
  jobLocationValidator,
  jobCompanyValidator,
  jobSalaryValidator,
} from "@/validation/jobs/jobs-validators";
import CurvedUnderlineTitle from "../CurvedUnderline";
import { orange } from "@mui/material/colors";

export function AddJob() {
  console.log("add job rendered");
  useRedirectWhenLoggedOut("/auth/signin");
  const isMounted = useRef<boolean>(false);

  const jobTitleRef = useRef<null | HTMLInputElement>(null);
  const jobLocationRef = useRef<null | HTMLInputElement>(null);
  const jobCompanyRef = useRef<null | HTMLInputElement>(null);
  const jobSalaryRef = useRef<null | HTMLInputElement>(null);
  const jobDescriptionRef = useRef<null | HTMLInputElement>(null);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  const [jobCompany, setJobCompany] = useState<string>("");
  const [jobSalary, setJobSalary] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");

  const inputRefs = useMemo(
    () =>
      new Map([
        ["jobTitle", jobTitleRef],
        ["jobDescription", jobDescriptionRef],
        ["jobLocation", jobLocationRef],
        ["jobCompany", jobCompanyRef],
        ["jobSalary", jobSalaryRef],
      ]),
    []
  );
  const {
    elementsStatus: status,
    resetAll,
    setAllToTouched,
  } = useFormClientStatus(inputRefs);

  const dispatch = useDispatch<AppDispatch>();
  const addJobInfo: {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  } = useSelector(selectAddJob);

  const fetchJobsInfo: {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  } = useSelector(selectFetchJobs);

  const jobs:
    | { id: string; jobTitle: string; jobDescription: string; userId: string }[]
    | undefined = useSelector(selectJobsByUserId);

  useClearFormOnSuccess(addJobInfo, clearForm);
  const shouldHideMessage = useHideMessageOnNavAway(addJobInfo);

  const jobTitleIsValid = zodValidator(jobTitle, {
    jobTitle: jobTitleValidator,
  });
  const jobDescriptionIsValid = zodValidator(jobDescription, {
    jobDescription: jobDescriptionValidator,
  });
  const jobLocationIsValid = zodValidator(jobLocation, {
    jobLocation: jobLocationValidator,
  });
  const jobCompanyIsValid = zodValidator(jobCompany, {
    jobCompany: jobCompanyValidator,
  });
  const jobSalaryIsValid = zodValidator(jobSalary, {
    jobSalary: jobSalaryValidator,
  });
  const isFormValid =
    jobTitleIsValid &&
    jobDescriptionIsValid &&
    jobLocationIsValid &&
    jobCompanyIsValid &&
    jobSalaryIsValid;

  function handleSubmit(e) {
    e.preventDefault();
    setAllToTouched();
    dispatch(
      addJob({ jobTitle, jobDescription, jobCompany, jobLocation, jobSalary })
    );
  }

  function handleJobDelete(id: string) {
    dispatch(deleteJob(id));
  }

  function clearForm() {
    setJobTitle("");
    setJobDescription("");
    setJobLocation("");
    setJobCompany("");
    setJobSalary("");
    resetAll();
  }

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <>
      <CurvedUnderlineTitle
        component={"h1"}
        variant={"h3"}
        title={"Add a Job"}
        color={orange[300]}
        sxUnderline={{ left: 2, borderRadius: "30%" }}
        sxTypography={{
          marginBottom: "12px !important",
          alignSelf: "center",
        }}
      />
      <Stack spacing={2} alignItems="center">
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={"900px"}
          width="100%"
          gap={2}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          component="form">
          <Stack direction={"row"} gap={2}>
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
              sx={{ flexGrow: 1 }}
            />
            <TextField
              id="job-location"
              name="job-location"
              label="Job location"
              variant="outlined"
              inputRef={jobLocationRef}
              value={jobLocation}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setJobLocation(event.target.value);
              }}
              error={
                !jobLocationIsValid && status?.get("jobLocation")?.isTouched
              }
              helperText={
                !jobLocationIsValid &&
                (status?.get("jobLocation")?.hasBeenFocused ||
                  status?.get("jobLocation")?.isTouched) &&
                "Insert two or more characters"
              }
              sx={{ flexGrow: 1 }}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <TextField
              id="job-company"
              name="job-company"
              label="Company name"
              variant="outlined"
              inputRef={jobCompanyRef}
              value={jobCompany}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setJobCompany(event.target.value);
              }}
              error={!jobCompanyIsValid && status?.get("jobCompany")?.isTouched}
              helperText={
                !jobCompanyIsValid &&
                (status?.get("jobCompany")?.hasBeenFocused ||
                  status?.get("jobCompany")?.isTouched) &&
                "Insert two or more characters"
              }
              sx={{ flexGrow: 1 }}
            />
            <TextField
              id="job-salary"
              name="job-salary"
              label="Salary"
              variant="outlined"
              inputRef={jobSalaryRef}
              value={jobSalary}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setJobSalary(event.target.value);
              }}
              error={!jobSalaryIsValid && status?.get("jobSalary")?.isTouched}
              helperText={
                !jobSalaryIsValid &&
                (status?.get("jobSalary")?.hasBeenFocused ||
                  status?.get("jobSalary")?.isTouched) &&
                "Insert four or more characters"
              }
              sx={{ flexGrow: 1 }}
            />
          </Stack>

          {!isMounted.current ? (
            <Skeleton variant="rectangular" width={"100%"} height={125} />
          ) : (
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
                !jobDescriptionIsValid &&
                status?.get("jobDescription")?.isTouched
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

          <Button
            type="submit"
            // disabled={addJobInfo.isLoading || !isFormValid}
            variant="contained"
            color="primary">
            Add Job
          </Button>
          {!shouldHideMessage && addJobInfo.message && (
            <Box
              component="p"
              color={addJobInfo.isError ? "error.main" : "success.main"}
              aria-live="polite"
              role="status">
              {!shouldHideMessage && addJobInfo.message}
            </Box>
          )}
        </Box>
      </Stack>
      <CurvedUnderlineTitle
        component={"h2"}
        variant={"h4"}
        title={"Jobs you added"}
        color={orange[300]}
        sxUnderline={{ left: 2, borderRadius: "30%" }}
        sxTypography={{
          marginBottom: "12px !important",
          alignSelf: "center",
          paddingTop: 4,
        }}
      />
      <JobsPreview
        jobs={jobs}
        isLoading={fetchJobsInfo.isLoading}
        isError={fetchJobsInfo.isError}
        handleJobDelete={handleJobDelete}></JobsPreview>
    </>
  );
}
