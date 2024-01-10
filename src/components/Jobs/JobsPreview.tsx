"use client";

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

export function JobsPreview() {
  const dispatch = useDispatch<AppDispatch>();
  const fetchJobsInfo: {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  } = useSelector(selectFetchJobs);

  const jobs:
    | { id: string; jobTitle: string; jobDescription: string; userId: string }[]
    | undefined = useSelector(selectJobsByUserId);

  function handleJobDelete(id: string) {
    dispatch(deleteJob(id));
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
  return fetchJobsInfo.isLoading ? (
    "Loading ..."
  ) : fetchJobsInfo.isError ? (
    "Error: There was a problem fetching the jobs. Please reload the page and try again."
  ) : (
    <div>{renderedJobs}</div>
  );
}
