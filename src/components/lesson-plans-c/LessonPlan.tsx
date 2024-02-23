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
import FloatingId from "@/components/layout-c/FloatingId";
import useRedirectWhenLoggedOut from "@/customHooks/useRedirectWhenLoggedOut";
import { Fragment, useMemo } from "react";
import InsecureNextLink from "next/link";
import CurvedUnderlineTitle from "../presentation-c/CurvedUnderline";
import { orange } from "@mui/material/colors";
import { LessonPlan } from "@/models/types/LessonPlans/LessonPlan";

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
}: LessonPlan) {
  console.log("LessonPlan rendered");
  //useRedirectWhenLoggedOut("/auth/signin", isPremium);
  const theme = useTheme();

  const memoizedTargetElementIds = useMemo(
    () => [
      "summary",
      "warmer",
      "teachVocabulary",
      "vocabularyExercise",
      "teachSpeakingPhrases",
      "rolePlay",
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
      href: "#summaryFloating",
      listItemTextPrimary: "Summary",
      targetElementId: "summary",
    },
    {
      href: "#warmerFloating",
      listItemTextPrimary: "Warmer",
      targetElementId: "warmer",
    },
    {
      href: "#teachVocabularyFloating",
      listItemTextPrimary: "Teach Vocabulary",
      targetElementId: "teachVocabulary",
    },
    {
      href: "#vocabularyExerciseFloating",
      listItemTextPrimary: "Vocabulary Exercise",
      targetElementId: "vocabularyExercise",
    },
    {
      href: "#teachSpeakingPhrasesFloating",
      listItemTextPrimary: "Teach Speaking Phrases",
      targetElementId: "teachSpeakingPhrases",
    },
    {
      href: "#rolePlayFloating",
      listItemTextPrimary: "Role Play",
      targetElementId: "rolePlay",
    },
    {
      href: "#feedbackFloating",
      listItemTextPrimary: "Feedback",
      targetElementId: "feedback",
    },
    {
      href: "#plenaryFloating",
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
      floatingId: "warmerFloating",
      sectionTitle: "Warmer",
      id: "warmer",
      content: warmer,
    },
    {
      floatingId: "teachVocabularyFloating",
      sectionTitle: "Teach Vocabulary",
      id: "teachVocabulary",
      content: teachVocabulary,
    },
    {
      floatingId: "vocabularyExerciseFloating",
      sectionTitle: "Vocabulary Exercise",
      id: "vocabularyExercise",
      content: vocabularyExercises,
    },
    {
      floatingId: "teachSpeakingPhrasesFloating",
      sectionTitle: "Teach Speaking Phrases",
      id: "teachSpeakingPhrases",
      content: teachSpeakingPhrases,
    },
    {
      floatingId: "rolePlayFloating",
      sectionTitle: "Role Play",
      id: "rolePlay",
      content: rolePlay,
    },
    {
      floatingId: "feedbackFloating",
      sectionTitle: "Feedback",
      id: "feedback",
      content: feedback,
    },
    {
      floatingId: "plenaryFloating",
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
            sx={{
              fontSize: { xs: theme.typography.body15.fontSize, sm: "1rem" },
            }}>
            {summary}
          </Typography>

          {renderedSections}
        </Grid>
      </Grid>
    </Stack>
  );
}
