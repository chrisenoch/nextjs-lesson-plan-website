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
import useOnSuccessfulHttpResponse from "@/customHooks/useOnSuccessfulHttpResponse";
import useHideMessageOnNavAway from "@/customHooks/useHideMessageOnNavAway";
import { isAddJobValid } from "@/validation/jobs/jobs-validators";
import CurvedUnderlineTitle from "../Presentation/CurvedUnderline";
import { orange, red } from "@mui/material/colors";
import NotificationBox from "../NotificationBox";
import { StandardResponseInfo } from "@/models/types/DataFetching/StandardResponseInfo";
import { Job } from "@/models/types/Jobs/Jobs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ValueOf } from "next/dist/shared/lib/constants";
import { PropertyNamesAsStrings } from "@/models/types/TypeScriptHelpers/PropertyNamesAsStrings";
import { getKeysAsValues } from "@/utils/object-functions";
import { delay } from "@/utils/delay";

export function AddJob() {
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

  const formFieldRefs = useMemo(() => {
    return {
      jobTitle: jobTitleRef,
      jobDescription: jobDescriptionRef,
      jobLocation: jobLocationRef,
      jobCompany: jobCompanyRef,
      jobSalary: jobSalaryRef,
    };
  }, []);
  const { formFieldsStatus, resetAllFields, setAllToTouched, getFieldNames } =
    useFormClientStatus(formFieldRefs);
  const fields = getFieldNames() as PropertyNamesAsStrings<
    typeof formFieldRefs
  >;

  const dispatch = useAppDispatch();
  const addJobInfo: StandardResponseInfo = useAppSelector(selectAddJob);
  const fetchJobsInfo: StandardResponseInfo = useAppSelector(selectFetchJobs);
  const jobs: Job[] | undefined = useAppSelector(selectJobsByUserId);

  useOnSuccessfulHttpResponse(addJobInfo, clearForm);
  const shouldHideMessage = useHideMessageOnNavAway(addJobInfo);

  const inputToValidate = {
    jobTitle,
    jobDescription,
    jobLocation,
    jobCompany,
    jobSalary,
  };
  const {
    isFormValid,
    isJobTitleValid,
    isJobDescriptionValid,
    isJobLocationValid,
    isJobCompanyValid,
    isJobSalaryValid,
  } = isAddJobValid(inputToValidate);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    console.log("in handlesubmit");
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
    resetAllFields();
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
              inputProps={{
                "data-testid": fields.jobTitle,
              }}
              id={fields.jobTitle}
              name={fields.jobTitle}
              label="Job title"
              variant="outlined"
              inputRef={jobTitleRef}
              value={jobTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setJobTitle(event.target.value);
              }}
              error={
                !isJobTitleValid &&
                formFieldsStatus?.get(fields.jobTitle)?.isTouched
              }
              helperText={
                !isJobTitleValid &&
                (formFieldsStatus?.get(fields.jobTitle)?.hasBeenFocused ||
                  formFieldsStatus?.get(fields.jobTitle)?.isTouched) &&
                "Insert two or more characters"
              }
              sx={{ flexGrow: 1 }}
            />
            <TextField
              inputProps={{
                "data-testid": fields.jobLocation,
              }}
              id={fields.jobLocation}
              name={fields.jobLocation}
              label="Job location"
              variant="outlined"
              inputRef={jobLocationRef}
              value={jobLocation}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setJobLocation(event.target.value);
              }}
              error={
                !isJobLocationValid &&
                formFieldsStatus?.get(fields.jobLocation)?.isTouched
              }
              helperText={
                !isJobLocationValid &&
                (formFieldsStatus?.get(fields.jobLocation)?.hasBeenFocused ||
                  formFieldsStatus?.get(fields.jobLocation)?.isTouched) &&
                "Insert two or more characters"
              }
              sx={{ flexGrow: 1 }}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <TextField
              inputProps={{
                "data-testid": fields.jobCompany,
              }}
              id={fields.jobCompany}
              name={fields.jobCompany}
              label="Company name"
              variant="outlined"
              inputRef={jobCompanyRef}
              value={jobCompany}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setJobCompany(event.target.value);
              }}
              error={
                !isJobCompanyValid &&
                formFieldsStatus?.get(fields.jobCompany)?.isTouched
              }
              helperText={
                !isJobCompanyValid &&
                (formFieldsStatus?.get(fields.jobCompany)?.hasBeenFocused ||
                  formFieldsStatus?.get(fields.jobCompany)?.isTouched) &&
                "Insert two or more characters"
              }
              sx={{ flexGrow: 1 }}
            />
            <TextField
              inputProps={{
                "data-testid": fields.jobSalary,
              }}
              id={fields.jobSalary}
              name={fields.jobSalary}
              label="Salary"
              variant="outlined"
              inputRef={jobSalaryRef}
              value={jobSalary}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setJobSalary(event.target.value);
              }}
              error={
                !isJobSalaryValid &&
                formFieldsStatus?.get(fields.jobSalary)?.isTouched
              }
              helperText={
                !isJobSalaryValid &&
                (formFieldsStatus?.get(fields.jobSalary)?.hasBeenFocused ||
                  formFieldsStatus?.get(fields.jobSalary)?.isTouched) &&
                "Insert four or more characters"
              }
              sx={{ flexGrow: 1 }}
            />
          </Stack>

          {!isMounted.current ? (
            <Skeleton variant="rectangular" width={"100%"} height={125} />
          ) : (
            <TextField
              inputProps={{
                "data-testid": fields.jobDescription,
              }}
              id={fields.jobDescription}
              name={fields.jobDescription}
              label="Job Description"
              inputRef={jobDescriptionRef}
              value={jobDescription}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setJobDescription(event.target.value);
              }}
              error={
                !isJobDescriptionValid &&
                formFieldsStatus?.get(fields.jobDescription)?.isTouched
              }
              helperText={
                !isJobDescriptionValid &&
                (formFieldsStatus?.get(fields.jobDescription)?.hasBeenFocused ||
                  formFieldsStatus?.get(fields.jobDescription)?.isTouched) &&
                "Insert two or more characters"
              }
              multiline
              minRows={4}
            />
          )}

          <Button
            data-testid="addJobSubmitButton"
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
