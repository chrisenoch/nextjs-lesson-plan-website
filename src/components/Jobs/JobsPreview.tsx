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
  Box,
  Stack,
  CardActions,
  Button,
  Collapse,
  styled,
  IconButtonProps,
  Divider,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { orange } from "@mui/material/colors";
import CurvedUnderlineTitle from "../CurvedUnderline";

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
              // boxShadow:
              //   "0px 2px 1px -1px #67b26d, 0px 1px 1px 0px #67b26d, 0px 1px 3px 0px #67b26d",
            }}
            key={job.id}>
            <CardContent>
              <CurvedUnderlineTitle
                component={"h1"}
                variant="h5"
                title="Software developer"
                color={orange[200]}
                sxUnderline={{ left: 2, borderRadius: "10%" }}
                sxTypography={{ marginBottom: 1 }}
              />
            </CardContent>
            {/* <CardHeader
              color="primary"
              sx={{
                "& .MuiCardHeader-title": {
                  //color: "secondary.main",
                },
              }}
              action={
                !handleJobDelete ? null : (
                  <IconButton
                    onClick={() => handleJobDelete(job.id)}
                    aria-label="delete-job">
                    <Delete />
                  </IconButton>
                )
              }
              title={job.jobTitle}
            /> */}
            <CardContent
              sx={{
                display: "flex",
                gap: 2,
                paddingTop: 0,
                color: "text.secondary",
                flexWrap: "wrap",
                marginTop: 0.5,
              }}>
              <Stack direction="row">
                <PlaceOutlinedIcon
                  sx={{
                    fontWeight: "bold",
                  }}
                />
                <Typography marginLeft={0.5} noWrap>
                  Madrid
                </Typography>
              </Stack>

              <Stack direction="row">
                <EuroOutlinedIcon
                  sx={{
                    fontWeight: "bold",
                  }}
                />
                <Typography marginLeft={0.5} noWrap>
                  €20000 - €25000 per annum
                </Typography>
              </Stack>
              <Stack direction="row">
                <BusinessOutlinedIcon
                  sx={{
                    fontWeight: "bold",
                  }}
                />
                <Typography marginLeft={0.5} noWrap>
                  Google
                </Typography>
              </Stack>
            </CardContent>

            <CardContent sx={{ paddingBottom: 0 }}>
              <Typography
                paragraph
                sx={{
                  color: "text.secondary",
                  fontSize: "0.9375rem",
                }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Placeat doloribus quos maiores voluptate hic ex unde voluptatem
                mollitia atque, ab earum, numquam minima facilis quaerat quis
                alias, dolor culpa nemo.
              </Typography>
            </CardContent>
            <CardActions sx={{ paddingX: 2, paddingBottom: 2 }}>
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
            </CardActions>
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

{
  /* <Typography variant="subtitle1">{job.jobDescription}</Typography> */
}
