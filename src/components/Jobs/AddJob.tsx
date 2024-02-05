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
import { isAddJobValid } from "@/validation/jobs/jobs-validators";
import CurvedUnderlineTitle from "../Presentation/CurvedUnderline";
import { orange, red } from "@mui/material/colors";
import NotificationBox from "../NotificationBox";
import { StandardResponseInfo } from "@/models/types/DataFetching/StandardResponseInfo";

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

  const fields = {
    jobTitle: "jobTitle",
    jobDescription: "jobDescription",
    jobLocation: "jobLocation",
    jobCompany: "jobCompany",
    jobSalary: "jobSalary",
  };

  const inputRefs = useMemo(
    () =>
      new Map([
        [fields.jobTitle, jobTitleRef],
        [fields.jobDescription, jobDescriptionRef],
        [fields.jobLocation, jobLocationRef],
        [fields.jobCompany, jobCompanyRef],
        [fields.jobSalary, jobSalaryRef],
      ]),
    [
      fields.jobCompany,
      fields.jobDescription,
      fields.jobLocation,
      fields.jobSalary,
      fields.jobTitle,
    ]
  );
  //To do Change inputrefs map for an object in useFormClientStatus so as to reduce code.
  const {
    elementsStatus: status,
    resetAll,
    setAllToTouched,
  } = useFormClientStatus(inputRefs);

  const dispatch = useDispatch<AppDispatch>();
  const addJobStatus: StandardResponseInfo = useSelector(selectAddJob);
  const fetchJobsStatus: StandardResponseInfo = useSelector(selectFetchJobs);

  const jobs:
    | {
        id: string;
        jobTitle: string;
        jobDescription: string;
        jobLocation: string;
        jobCompany: string;
        jobSalary: string;
        userId: string;
      }[]
    | undefined = useSelector(selectJobsByUserId);

  useClearFormOnSuccess(addJobStatus, clearForm);
  const shouldHideMessage = useHideMessageOnNavAway(addJobStatus);

  const {
    isValid: isFormValid,
    jobTitle: jobTitleIsValid,
    jobDescription: jobDescriptionIsValid,
    jobLocation: jobLocationIsValid,
    jobCompany: jobCompanyIsValid,
    jobSalary: jobSalaryIsValid,
  } = isAddJobValid({
    jobTitle,
    jobDescription,
    jobLocation,
    jobCompany,
    jobSalary,
  });

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
      <Stack spacing={2} alignItems="center" marginTop={3}>
        <Box
          component="form"
          display="flex"
          flexDirection={"column"}
          maxWidth={"900px"}
          width="100%"
          gap={2}
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
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
              error={
                !jobTitleIsValid && status?.get(fields.jobTitle)?.isTouched
              }
              helperText={
                !jobTitleIsValid &&
                (status?.get(fields.jobTitle)?.hasBeenFocused ||
                  status?.get(fields.jobTitle)?.isTouched) &&
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
                !jobLocationIsValid &&
                status?.get(fields.jobLocation)?.isTouched
              }
              helperText={
                !jobLocationIsValid &&
                (status?.get(fields.jobLocation)?.hasBeenFocused ||
                  status?.get(fields.jobLocation)?.isTouched) &&
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
              error={
                !jobCompanyIsValid && status?.get(fields.jobCompany)?.isTouched
              }
              helperText={
                !jobCompanyIsValid &&
                (status?.get(fields.jobCompany)?.hasBeenFocused ||
                  status?.get(fields.jobCompany)?.isTouched) &&
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
              error={
                !jobSalaryIsValid && status?.get(fields.jobSalary)?.isTouched
              }
              helperText={
                !jobSalaryIsValid &&
                (status?.get(fields.jobSalary)?.hasBeenFocused ||
                  status?.get(fields.jobSalary)?.isTouched) &&
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
                status?.get(fields.jobDescription)?.isTouched
              }
              helperText={
                !jobDescriptionIsValid &&
                (status?.get(fields.jobDescription)?.hasBeenFocused ||
                  status?.get(fields.jobDescription)?.isTouched) &&
                "Insert two or more characters"
              }
              multiline
              minRows={4}
            />
          )}

          <Button
            type="submit"
            // disabled={addJobStatus.isLoading || !isFormValid}
            variant="contained"
            color="primary">
            Add Job
          </Button>
          {!shouldHideMessage && addJobStatus.message && (
            <NotificationBox
              message={addJobStatus.message}
              sxOuterContainer={{
                marginTop: 2,
              }}
              variant={addJobStatus.isError ? "error" : "success"}
            />
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
          paddingTop: 6,
        }}
      />
      <JobsPreview
        jobs={jobs}
        isLoading={fetchJobsStatus.isLoading}
        isError={fetchJobsStatus.isError}
        handleJobDelete={handleJobDelete}></JobsPreview>
    </>
  );
}
