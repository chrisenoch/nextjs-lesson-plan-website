"use client";

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
  console.log("jobs in jobs preview");
  console.log(jobs.jobs);

  const [hasmounted, sethasmounted] = useState(false);

  useEffect(() => {
    sethasmounted(true);
  }, []);

  if (!hasmounted) {
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
  return jobs.isLoading ? "Loading ..." : <ul>{renderedJobs}</ul>;
}
