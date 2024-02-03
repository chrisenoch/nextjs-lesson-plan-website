"use client";

import { useHydrated } from "@/customHooks/useHydrated";
import InSecureNextLink from "next/link";
import { ArrowForward, Delete } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  IconButton,
  Stack,
  CardActions,
  Button,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

export function JobsPreview({
  jobs,
  isLoading,
  isError,
  handleJobDelete,
}: {
  jobs: { id: string; jobTitle: string; jobDescription: string }[] | undefined;
  isLoading: boolean;
  isError: boolean;
  handleJobDelete?: (id: string) => void;
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
          <Card
            sx={{
              mb: 1,
              width: "fit-content",
              minWidth: 300,
              maxWidth: "500px",
              border: "1px solid #c4ddf0",
              borderRadius: 4,
            }}
            key={job.id}>
            <CardHeader
              color="primary"
              sx={{
                "& .MuiCardHeader-title": {
                  backgroundColor: "#dff3d7",
                  display: "inline-block",
                  padding: 1,
                  borderRadius: 4,
                },
              }}
              title={job.jobTitle}
            />
            <CardContent
              sx={{
                display: "flex",
                gap: 2,
                paddingTop: 0,
                flexWrap: "wrap",
                marginTop: 0.5,
              }}>
              <Stack direction="row">
                <PlaceOutlinedIcon />
                <Typography marginLeft={0.5} noWrap>
                  Madrid
                </Typography>
              </Stack>

              <Stack direction="row">
                <EuroOutlinedIcon />
                <Typography marginLeft={0.5} noWrap>
                  €20000 - €25000 per annum
                </Typography>
              </Stack>
              <Stack direction="row">
                <BusinessOutlinedIcon />
                <Typography marginLeft={0.5} noWrap>
                  Google
                </Typography>
              </Stack>
            </CardContent>

            <CardContent>
              <Typography
                paragraph
                sx={{
                  color: "text.secondary",
                  fontSize: "0.9375rem",
                  marginBottom: 0,
                }}>
                {job.jobDescription}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                paddingX: 2,
                paddingBottom: 2,
                justifyContent: "space-between",
              }}>
              <Button
                href={`#`}
                color="secondary"
                variant={"text"}
                size="large"
                startIcon={<ArrowForward />}
                component={InSecureNextLink}
                sx={{
                  marginRight: 1,
                }}>
                View
              </Button>

              {handleJobDelete && (
                <IconButton
                  onClick={() => {
                    handleJobDelete(job.id);
                  }}
                  aria-label="delete">
                  <Delete />
                </IconButton>
              )}
            </CardActions>
          </Card>
        );
      });
  return isLoading ? (
    "Loading ..."
  ) : isError ? (
    "Error: There was a problem fetching the jobs. Please reload the page and try again."
  ) : (
    <Stack direction={"row"} justifyContent="center" flexWrap={"wrap"} gap={2}>
      {renderedJobs}
    </Stack>
  );
}
