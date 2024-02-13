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
  useTheme,
} from "@mui/material";
import FloatingId from "@/components/Layout/FloatingId";
import useRedirectWhenLoggedOut from "@/customHooks/useRedirectWhenLoggedOut";
import { Fragment, useMemo } from "react";
import InsecureNextLink from "next/link";
import CurvedUnderlineTitle from "../Presentation/CurvedUnderline";
import { orange } from "@mui/material/colors";

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
  const theme = useTheme();

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

  const listItems: {
    href: string;
    listItemTextPrimary: string;
    targetElementId: string;
  }[] = [
    {
      href: "#summary-floating",
      listItemTextPrimary: "Summary",
      targetElementId: "summary",
    },
    {
      href: "#warmer-floating",
      listItemTextPrimary: "Warmer",
      targetElementId: "warmer",
    },
    {
      href: "#teach-vocabulary-floating",
      listItemTextPrimary: "Teach Vocabulary",
      targetElementId: "teach-vocabulary",
    },
    {
      href: "#vocabulary-exercise-floating",
      listItemTextPrimary: "Vocabulary Exercise",
      targetElementId: "vocabulary-exercise",
    },
    {
      href: "#teach-speaking-phrases-floating",
      listItemTextPrimary: "Teach Speaking Phrases",
      targetElementId: "teach-speaking-phrases",
    },
    {
      href: "#role-play-floating",
      listItemTextPrimary: "Role Play",
      targetElementId: "role-play",
    },
    {
      href: "#feedback-floating",
      listItemTextPrimary: "Feedback",
      targetElementId: "feedback",
    },
    {
      href: "#plenary",
      listItemTextPrimary: "Plenary",
      targetElementId: "plenary",
    },
  ];

  const sections: {
    id: string;
    sectionTitle: string;
    floatingId: string;
    content: string;
  }[] = [
    {
      floatingId: "warmer-floating",
      sectionTitle: "Warmer",
      id: "warmer",
      content: warmer,
    },
    {
      floatingId: "teach-vocabulary-floating",
      sectionTitle: "Teach Vocabulary",
      id: "teach-vocabulary",
      content: teachVocabulary,
    },
    {
      floatingId: "vocabulary-exercise-floating",
      sectionTitle: "Vocabulary Exercise",
      id: "vocabulary-exercise",
      content: vocabularyExercises,
    },
    {
      floatingId: "teach-speaking-phrases-floating",
      sectionTitle: "Teach Speaking Phrases",
      id: "teach-speaking-phrases",
      content: teachSpeakingPhrases,
    },
    {
      floatingId: "role-play-floating",
      sectionTitle: "Role Play",
      id: "role-play",
      content: rolePlay,
    },
    {
      floatingId: "feedback-floating",
      sectionTitle: "Feedback",
      id: "feedback",
      content: feedback,
    },
    {
      floatingId: "plenary-floating",
      sectionTitle: "Plenary",
      id: "plenary",
      content: plenary,
    },
  ];

  const renderedSections = sections.map((s) => (
    <Fragment key={s.id}>
      <Typography
        id={s.id}
        gutterBottom
        variant="h4"
        component="h2"
        position="relative">
        {s.sectionTitle}
        <FloatingId id={s.floatingId} />
      </Typography>
      <Typography
        variant="body1"
        marginBottom={5}
        sx={{ fontSize: { xs: theme.typography.body15.fontSize, sm: "1rem" } }}>
        {s.content}
      </Typography>
    </Fragment>
  ));

  const renderedListitems = listItems.map((listItem) => (
    <ListItem disablePadding key={listItem.targetElementId}>
      <ListItemButton component={InsecureNextLink} href={listItem.href}>
        <ListItemText
          primary={listItem.listItemTextPrimary}
          sx={{
            "& .MuiListItemText-primary": {
              fontWeight:
                activeIntersection === listItem.targetElementId
                  ? "bold"
                  : "normal",
              color: "primary.main",
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  ));

  return (
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
            {renderedListitems}
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

          {renderedSections}
        </Grid>
      </Grid>
    </Stack>
  );
}
