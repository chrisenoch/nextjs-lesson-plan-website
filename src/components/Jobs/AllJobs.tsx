"use client";

import { selectAllJobs, selectFetchJobs } from "@/store";
import { JobsPreview } from "./JobsPreview";
import { Job } from "@/models/types/Jobs/Jobs";
import { useAppSelector } from "@/store/hooks";
import { StandardResponseInfo } from "@/models/types/DataFetching/StandardResponseInfo";

export function AllJobs() {
  console.log("all jobs rendered");

  const fetchJobsInfo: StandardResponseInfo = useAppSelector(selectFetchJobs);
  const jobs: Job[] | undefined = useAppSelector(selectAllJobs);

  return (
    <JobsPreview
      jobs={jobs}
      isLoading={fetchJobsInfo?.isLoading}
      isError={fetchJobsInfo.isError}></JobsPreview>
  );
}
