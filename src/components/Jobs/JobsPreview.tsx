import { SerializedError } from "@reduxjs/toolkit";

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
