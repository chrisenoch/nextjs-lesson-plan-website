"use client";

import { useHydrated } from "@/customHooks/useHydrated";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";

export function JobsPreviewRTKQuery({
  jobs,
  isSuccess,
  isError,
  error,
  isLoading,
}: {
  jobs: { id: string; jobTitle: string; jobDescription: string }[];
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  error: SerializedError | FetchBaseQueryError | undefined; //Check this is the correct type.
}) {
  console.log("jobs in jobs preview");
  console.log(jobs);

  const isHydrated = useHydrated();

  if (!isHydrated) {
    return "Loading ...";
  }

  //To do: Turn the jobs into links
  const renderedJobs = jobs.map((job) => {
    return (
      <li key={job.id}>
        {job.jobTitle} {job.jobDescription}
      </li>
    );
  });
  return isLoading ? (
    "Loading ..."
  ) : error ? (
    "Error: There was a problem fetching the jobs. Please reload the page and try again."
  ) : (
    <ul>{renderedJobs}</ul>
  );
}
