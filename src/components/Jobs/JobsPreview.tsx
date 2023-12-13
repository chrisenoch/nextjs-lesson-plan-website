"use client";

import { useHydrated } from "@/customHooks/useHydrated";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

export function JobsPreview({
  jobs,
}: {
  jobs: {
    jobs: { id: string; jobTitle: string; jobDescription: string }[];
    isLoading: boolean;
    error: null | SerializedError;
  };
}) {
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return "Loading ...";
  }

  //To do: Turn the jobs into links
  const renderedJobs = jobs.jobs.map((job) => {
    return (
      <li key={job.id}>
        {job.jobTitle} {job.jobDescription}
      </li>
    );
  });
  return jobs.isLoading ? (
    "Loading ..."
  ) : jobs.error ? (
    "Error: There was a problem fetching the jobs. Please reload the page and try again."
  ) : (
    <ul>{renderedJobs}</ul>
  );
}
