"use client";

import useScrollSpy from "@/customHooks/useScrollSpy";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import FloatingId from "@/components/FloatingId";
import useRedirectWhenLoggedOut from "@/customHooks/useRedirectWhenLoggedOut";

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
  useRedirectWhenLoggedOut("/auth/signin", isPremium);

  let activeIntersection = useScrollSpy([
    "summary",
    "warmer",
    "teach-vocabulary",
    "vocabulary-exercise",
    "teach-speaking-phrases",
    "role-play",
    "feedback",
    "plenary",
  ]);

  return (
    <Stack
      direction="row"
      maxWidth={"1200px"}
      mx={"auto"}
      marginTop={2}
      marginBottom={2}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "fixed",
            }}
            aria-label="summary">
            <ListItem disablePadding>
              <ListItemButton component="a" href="#summary-floating">
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
              <ListItemButton component="a" href="#warmer-floating">
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
              <ListItemButton component="a" href="#teach-vocabulary-floating">
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
                component="a"
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
                component="a"
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
              <ListItemButton component="a" href="#role-play-floating">
                <ListItemText
                  primary="Role Play"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight:
                        activeIntersection === "role-play" ? "bold" : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#feedback-floating">
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
              <ListItemButton
                component="a"
                href="#plenary"
                onClick={() => (activeIntersection = "plenary-floating")}>
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
        <Grid item xs={8} bgcolor={"background.paper"} marginTop={4}>
          <Typography
            gutterBottom
            variant="h2"
            component={"h1"}
            marginBottom={4}>
            {title}
          </Typography>
          <Typography
            id="summary"
            gutterBottom
            variant="h4"
            component="h2"
            position="relative">
            Summary
            <FloatingId id="summary-floating" />
          </Typography>
          <Typography variant="body1" marginBottom={4}>
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
          <Typography variant="body1" marginBottom={4}>
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
          <Typography variant="body1" marginBottom={4}>
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
          <Typography variant="body1" marginBottom={4}>
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
          <Typography variant="body1" marginBottom={4}>
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
          <Typography variant="body1" marginBottom={4}>
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
          <Typography variant="body1" marginBottom={4}>
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
          <Typography variant="body1" marginBottom={4}>
            {plenary}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
