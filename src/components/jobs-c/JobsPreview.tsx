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
  Box,
  SxProps,
  Theme,
  Divider,
  useTheme,
} from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import EuroOutlinedIcon from "@mui/icons-material/EuroOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { Masonry } from "@mui/lab";
import LoadingSpinner from "../presentation-c/LoadingSpinner";
import { Job } from "@/models/types/Jobs/Jobs";
import { setSXValues } from "@/component-functions/set-sx-values";

export function JobsPreview({
  jobs,
  isLoading,
  isError,
  handleJobDelete,
  sxTitle,
  sxDescription,
  sxDescriptionContainer,
  sxInfoBar,
}: {
  jobs: Job[] | undefined;
  isLoading: boolean;
  isError: boolean;
  handleJobDelete?: (id: number) => void;
  sxTitle?: SxProps<Theme>;
  sxDescription?: SxProps<Theme>;
  sxDescriptionContainer?: SxProps<Theme>;
  sxInfoBar?: SxProps<Theme>;
}) {
  const isHydrated = useHydrated();
  const theme = useTheme();

  if (!isHydrated) {
    return (
      <Box display="flex" justifyContent={"center"}>
        <LoadingSpinner />
      </Box>
    );
  }

  const sxTitleDefault: SxProps<Theme> = {
    "& .MuiCardHeader-title": {
      backgroundColor: "#dff3d7",
      display: "inline-block",
      padding: 1,
      borderRadius: 4,
    },
  };

  const sxDescriptionContainerDefault: SxProps<Theme> = {
    display: { xs: "none", md: "block" },
    paddingTop: 1,
  };

  const sxDescriptionDefault: SxProps<Theme> = {
    color: "text.secondary",
    fontSize: theme.typography.body15.fontSize,
    marginBottom: 0,
  };

  const sxInfoBarDefault: SxProps<Theme> = {
    display: "flex",
    columnGap: 2,
    rowGap: 1.5,
    paddingTop: 0,
    flexWrap: "wrap",
    marginTop: 0.5,
    fontSize: "1rem",
  };

  const {
    sxTitleFinal,
    sxInfoBarFinal,
    sxDescriptionFinal,
    sxDescriptionContainerFinal,
  } = setSXValues([
    {
      userValues: sxTitle,
      defaultValues: sxTitleDefault,
      sxName: "Title",
    },
    {
      userValues: sxInfoBar,
      defaultValues: sxInfoBarDefault,
      sxName: "InfoBar",
    },
    {
      userValues: sxDescription,
      defaultValues: sxDescriptionDefault,
      sxName: "Description",
    },
    {
      userValues: sxDescriptionContainer,
      defaultValues: sxDescriptionContainerDefault,
      sxName: "DescriptionContainer",
    },
  ]);

  //To do: Turn the jobs into links
  const renderedJobs = !jobs
    ? []
    : jobs.map((job) => {
        return (
          <Card
            sx={{
              mb: 1,
              width: "500px",
              height: "fit-content",
              border: "1px solid #c4ddf0",
              borderRadius: 4,
            }}
            key={job.id}>
            <CardHeader
              color="primary"
              sx={sxTitleFinal}
              title={job.jobTitle}
            />
            <CardContent sx={sxInfoBarFinal}>
              <Stack direction="row" alignItems={"center"}>
                <BusinessOutlinedIcon fontSize="inherit" />
                <Typography marginLeft={0.5} fontSize="inherit" noWrap>
                  {job.jobCompany}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems={"center"}>
                <PlaceOutlinedIcon fontSize="inherit" />
                <Typography marginLeft={0.5} fontSize="inherit" noWrap>
                  {job.jobLocation}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems={"center"}>
                <EuroOutlinedIcon fontSize="inherit" />
                <Typography marginLeft={0.5} fontSize="inherit" noWrap>
                  {job.jobSalary}
                </Typography>
              </Stack>
            </CardContent>
            <Divider
              sx={{
                marginX: 2,
                marginBottom: 1,
                display: { xs: "none", md: "block" },
              }}
            />
            <CardContent sx={sxDescriptionContainerFinal}>
              <Typography paragraph sx={sxDescriptionFinal}>
                {job.jobDescription}
              </Typography>
            </CardContent>
            <Divider sx={{ marginX: 2 }} />
            <CardActions
              sx={{
                paddingX: 2,
                paddingBottom: 1,
                justifyContent: "space-between",
              }}>
              <Button
                href={`#`}
                color="secondary"
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
    <Box display="flex" justifyContent={"center"}>
      <LoadingSpinner />
    </Box>
  ) : isError ? (
    "Error: There was a problem fetching the jobs. Please reload the page and try again."
  ) : (
    <Box display="flex" justifyContent={"center"}>
      {/* width = cardWidth * 2 + gap */}
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={2}
        width="1016px"
        justifyContent={"center"}>
        <Masonry columns={{ xs: 1, sm: 2 }} spacing={2}>
          {renderedJobs}
        </Masonry>
      </Stack>
    </Box>
  );
}
