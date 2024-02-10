"use client";

import useScrollSpy from "@/customHooks/useScrollSpy";
import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import FloatingId from "@/components/Layout/FloatingId";
import useRedirectWhenLoggedOut from "@/customHooks/useRedirectWhenLoggedOut";
import { useMemo } from "react";
import InsecureNextLink from "next/link";
import CurvedUnderlineTitle from "../Presentation/CurvedUnderline";
import { orange } from "@mui/material/colors";
import CircleIcon from "@mui/icons-material/Circle";
import { ResponsiveTypographyVariants } from "../ThemeRegistry/responsive-typography-sx";

export default function LessonPlan({
  isPremium,
  title,
  summary,
  warmer,
  teachVocabulary,
  vocabularyExercises,
  teachSpeakingPhrases,
  rolePlay,
  feedback,
  plenary,
}: {
  isPremium: boolean;
  title: string;
  summary: string;
  warmer: string;
  teachVocabulary: string;
  vocabularyExercises: string;
  teachSpeakingPhrases: string;
  rolePlay: string;
  feedback: string;
  plenary: string;
}) {
  console.log("LessonPlan rendered");
  useRedirectWhenLoggedOut("/auth/signin", isPremium);

  const memoizedTargetElementIds = useMemo(
    () => [
      "summary",
      "warmer",
      "teach-vocabulary",
      "vocabulary-exercise",
      "teach-speaking-phrases",
      "role-play",
      "feedback",
      "plenary",
    ],
    []
  );

  let activeIntersection = useScrollSpy(memoizedTargetElementIds);

  return (
    <>
      <Stack
        direction="row"
        maxWidth={"1200px"}
        sx={{
          mx: { xs: "-8px", sm: "auto" },
        }}
        marginTop={2}
        marginBottom={2}>
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: { xs: "center", md: "normal" },
          }}>
          <Grid
            item
            xs={3.5}
            sx={{
              display: { xs: "none", md: "block" },
            }}>
            <List
              sx={{
                //width: "100%",
                width: "fit-content",
                maxWidth: 360,
                bgcolor: "background.paper",
                position: "fixed",
              }}
              aria-label="summary">
              <ListItem disablePadding>
                <ListItemButton
                  component={InsecureNextLink}
                  href="#summary-floating">
                  {/* <ListItemIcon>
                  <StarIcon />
                </ListItemIcon> */}
                  <ListItemText
                    primary="Summary"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight:
                          activeIntersection === "summary" ? "bold" : "normal",
                        color: "primary.main",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={InsecureNextLink}
                  href="#warmer-floating">
                  <ListItemText
                    primary="Warmer"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight:
                          activeIntersection === "warmer" ? "bold" : "normal",
                        color: "primary.main",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={InsecureNextLink}
                  href="#teach-vocabulary-floating">
                  <ListItemText
                    primary="Teach Vocabulary"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight:
                          activeIntersection === "teach-vocabulary"
                            ? "bold"
                            : "normal",
                        color: "primary.main",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={InsecureNextLink}
                  href="#vocabulary-exercise-floating">
                  <ListItemText
                    primary="Vocabulary Exercise"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight:
                          activeIntersection === "vocabulary-exercise"
                            ? "bold"
                            : "normal",

                        color: "primary.main",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={InsecureNextLink}
                  href="#teach-speaking-phrases-floating">
                  <ListItemText
                    primary="Teach Speaking Phrases"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight:
                          activeIntersection === "teach-speaking-phrases"
                            ? "bold"
                            : "normal",
                        color: "primary.main",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={InsecureNextLink}
                  href="#role-play-floating">
                  <ListItemText
                    primary="Role Play"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight:
                          activeIntersection === "role-play"
                            ? "bold"
                            : "normal",
                        color: "primary.main",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={InsecureNextLink}
                  href="#feedback-floating">
                  <ListItemText
                    primary="Feedback"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight:
                          activeIntersection === "feedback" ? "bold" : "normal",
                        color: "primary.main",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={InsecureNextLink} href="#plenary">
                  <ListItemText
                    primary="Plenary"
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight:
                          activeIntersection === "plenary" ? "bold" : "normal",
                        color: "primary.main",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={10} md={8} bgcolor={"background.paper"}>
            <CurvedUnderlineTitle
              component={"h1"}
              variant="h2"
              title={title}
              color={orange[300]}
              sxUnderline={{ left: 2 }}
              sxTypography={{
                marginBottom: 6,
                display: { xs: "none", sm: "inline-block" },
              }}
            />
            <Typography
              id="summary"
              gutterBottom
              variant="h4"
              component="h2"
              position="relative"
              sx={{ display: { xs: "none", sm: "block" } }}>
              Summary
              <FloatingId id="summary-floating" />
            </Typography>
            <CurvedUnderlineTitle
              typographyId="summary"
              component={"h1"}
              variant="h4"
              title={title}
              color={orange[300]}
              sxUnderline={{ left: 2, borderRadius: "20%" }}
              sxTypography={{
                marginBottom: "0.75em",
                display: { xs: "inline-block", sm: "none" },
              }}>
              <FloatingId id="summary-floating" />
            </CurvedUnderlineTitle>

            <Typography
              variant="body1"
              marginBottom={5}
              sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}>
              {summary}
            </Typography>
            <Typography
              id="warmer"
              gutterBottom
              variant="h4"
              component="h2"
              position="relative">
              Warmer
              <FloatingId id="warmer-floating" />
            </Typography>
            <Typography
              variant="body1"
              marginBottom={5}
              sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}>
              {warmer}
            </Typography>
            <Typography
              id="teach-vocabulary"
              gutterBottom
              variant="h4"
              component="h2"
              position="relative">
              Teach Vocabulary
              <FloatingId id="teach-vocabulary-floating" />
            </Typography>
            <Typography
              variant="body1"
              marginBottom={5}
              sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}>
              {teachVocabulary}
            </Typography>
            <Typography
              id="vocabulary-exercise"
              gutterBottom
              variant="h4"
              component="h2"
              position="relative">
              Vocabulary exercise
              <FloatingId id="vocabulary-exercise-floating" />
            </Typography>
            <Typography
              variant="body1"
              marginBottom={5}
              sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}>
              {vocabularyExercises}
            </Typography>
            <Typography
              id="teach-speaking-phrases"
              gutterBottom
              variant="h4"
              component="h2"
              position="relative">
              Teach speaking phrases
              <FloatingId id="teach-speaking-phrases-floating" />
            </Typography>
            <Typography
              variant="body1"
              marginBottom={5}
              sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}>
              {teachSpeakingPhrases}
            </Typography>
            <Typography
              id="role-play"
              gutterBottom
              variant="h4"
              component="h2"
              position="relative">
              Role play
              <FloatingId id="role-play-floating" />
            </Typography>
            <Typography
              variant="body1"
              marginBottom={5}
              sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}>
              {rolePlay}
            </Typography>
            <Typography
              id="feedback"
              gutterBottom
              variant="h4"
              component="h2"
              position="relative">
              Feedback
              <FloatingId id="feedback-floating" />
            </Typography>
            <Typography
              variant="body1"
              marginBottom={5}
              sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}>
              {feedback}
            </Typography>
            <Typography
              id="plenary"
              gutterBottom
              variant="h4"
              component="h2"
              position="relative">
              Plenary
              <FloatingId id="plenary-floating" />
            </Typography>
            <Typography
              variant="body1"
              marginBottom={5}
              sx={{ fontSize: { xs: "0.9375rem", sm: "1rem" } }}>
              {plenary}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
