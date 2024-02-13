"use client";
import {
  Box,
  TextField,
  Button,
  Stack,
  Skeleton,
  useTheme,
} from "@mui/material";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import useFormClientStatus from "@/customHooks/useFormClientStatus";
import {
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
import { Job } from "@/models/types/Jobs/Jobs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function AddJob() {
  console.log("add job rendered");
  useRedirectWhenLoggedOut("/auth/signin");
  const isMounted = useRef<boolean>(false);

  const theme = useTheme();

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
  //To do Change inputRefs map for an object in useFormClientStatus so as to reduce code.
  const {
    elementsStatus: formStatus,
    resetAll,
    setAllToTouched,
  } = useFormClientStatus(inputRefs);

  const dispatch = useAppDispatch();
  const addJobInfo: StandardResponseInfo = useAppSelector(selectAddJob);
  const fetchJobsInfo: StandardResponseInfo = useAppSelector(selectFetchJobs);

  const jobs: Job[] | undefined = useAppSelector(selectJobsByUserId);

  useClearFormOnSuccess(addJobInfo, clearForm);
  const shouldHideMessage = useHideMessageOnNavAway(addJobInfo);

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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAllToTouched();
    dispatch(
      addJob({ jobTitle, jobDescription, jobCompany, jobLocation, jobSalary })
    );
  }

  function handleJobDelete(id: number) {
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
                !jobTitleIsValid && formStatus?.get(fields.jobTitle)?.isTouched
              }
              helperText={
                !jobTitleIsValid &&
                (formStatus?.get(fields.jobTitle)?.hasBeenFocused ||
                  formStatus?.get(fields.jobTitle)?.isTouched) &&
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
                formStatus?.get(fields.jobLocation)?.isTouched
              }
              helperText={
                !jobLocationIsValid &&
                (formStatus?.get(fields.jobLocation)?.hasBeenFocused ||
                  formStatus?.get(fields.jobLocation)?.isTouched) &&
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
                !jobCompanyIsValid &&
                formStatus?.get(fields.jobCompany)?.isTouched
              }
              helperText={
                !jobCompanyIsValid &&
                (formStatus?.get(fields.jobCompany)?.hasBeenFocused ||
                  formStatus?.get(fields.jobCompany)?.isTouched) &&
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
                !jobSalaryIsValid &&
                formStatus?.get(fields.jobSalary)?.isTouched
              }
              helperText={
                !jobSalaryIsValid &&
                (formStatus?.get(fields.jobSalary)?.hasBeenFocused ||
                  formStatus?.get(fields.jobSalary)?.isTouched) &&
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
                formStatus?.get(fields.jobDescription)?.isTouched
              }
              helperText={
                !jobDescriptionIsValid &&
                (formStatus?.get(fields.jobDescription)?.hasBeenFocused ||
                  formStatus?.get(fields.jobDescription)?.isTouched) &&
                "Insert two or more characters"
              }
              multiline
              minRows={4}
            />
          )}

          <Button
            type="submit"
            disabled={addJobInfo.isLoading || !isFormValid}
            variant="contained"
            color="primary">
            Add Job
          </Button>
          {!shouldHideMessage && addJobInfo.message && (
            <NotificationBox
              message={addJobInfo.message}
              sxOuterContainer={{
                marginTop: 2,
              }}
              variant={addJobInfo.isError ? "error" : "success"}
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
        isLoading={fetchJobsInfo.isLoading}
        isError={fetchJobsInfo.isError}
        handleJobDelete={handleJobDelete}
        sxInfoBar={{
          fontSize: { xs: theme.typography.body15.fontSize, md: "1rem" },
        }}
      />
    </>
  );
}
