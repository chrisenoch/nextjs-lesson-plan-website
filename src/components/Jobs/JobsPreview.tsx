"use client";

import { useHydrated } from "@/customHooks/useHydrated";
import {
  selectFetchJobs,
  selectJobsByUserId,
  deleteJob,
  AppDispatch,
} from "@/store";
import { Delete } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export function JobsPreview({
  jobs,
  isLoading,
  isError,
  handleJobDelete,
}: {
  jobs: { id: string; jobTitle: string; jobDescription: string }[] | undefined;
  isLoading: boolean;
  isError: boolean;
  handleJobDelete: (id: string) => void;
}) {
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return "Loading ...";
  }

  //To do: Turn the jobs into links
  const renderedJobs = !jobs
    ? []
    : jobs.map((job) => {
        return (
          <Card sx={{ mb: 1, maxWidth: 400, minWidth: 300 }} key={job.id}>
            <CardHeader
              action={
                <IconButton
                  onClick={() => handleJobDelete(job.id)}
                  aria-label="delete-job">
                  <Delete />
                </IconButton>
              }
              title={job.jobTitle}
            />
            <CardContent>
              <Typography variant="body2">{job.jobDescription}</Typography>
            </CardContent>
          </Card>
        );
      });
  return isLoading ? (
    "Loading ..."
  ) : isError ? (
    "Error: There was a problem fetching the jobs. Please reload the page and try again."
  ) : (
    <div>{renderedJobs}</div>
  );
}
