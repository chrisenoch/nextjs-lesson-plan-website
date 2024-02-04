"use client";

import { useSelector } from "react-redux";
import { selectAllJobs, selectFetchJobs } from "@/store";
import { JobsPreview } from "./JobsPreview";

export function AllJobs() {
  console.log("all jobs rendered");

  const fetchJobsInfo: {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  } = useSelector(selectFetchJobs);

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
    | undefined = useSelector(selectAllJobs);

  return (
    <JobsPreview
      jobs={jobs}
      isLoading={fetchJobsInfo?.isLoading}
      isError={fetchJobsInfo.isError}></JobsPreview>
  );
}
