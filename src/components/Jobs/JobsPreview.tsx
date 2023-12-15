"use client";

import { useHydrated } from "@/customHooks/useHydrated";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardHeader,
  IconButton,
} from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Delete } from "@mui/icons-material";

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
      <>
        <Card sx={{ mb: 1, maxWidth: 400, minWidth: 300 }} key={job.id}>
          <CardHeader
            action={
              <IconButton
                onClick={() => console.log("job deleted")}
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
      </>
    );
  });

  console.log("renderedJobs");
  console.log(renderedJobs);

  return jobs.isLoading ? (
    "Loading ..."
  ) : jobs.error ? (
    "Error: There was a problem fetching the jobs. Please reload the page and try again."
  ) : (
    <div>{renderedJobs}</div>
  );
}
