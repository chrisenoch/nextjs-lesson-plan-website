import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton, Divider, Stack, Chip } from "@mui/material";
import Circle from "@mui/icons-material/Circle";
import Diamond from "@mui/icons-material/Diamond";
import SecureNextLink from "../Utils/SecureNextLink";
import { LoadingButton } from "@mui/lab";
import { LessonPlanCard } from "@/models/types/LessonPlans/LessonPlanCard";
import { ArrowForward, Done, RocketLaunch } from "@mui/icons-material";
import { useHydrated } from "@/customHooks/useHydrated";
import LessonPlanCardBookmarkButton from "./LessonPlanCardBookmarkButton";
import { log } from "util";

export default function LessonPlanCard({
  id,
  title,
  description,
  duration,
  prepTime,
  level,
  isPremium,
  imageURL,
  imageAlt,
  chips,
  isBookmarked,
  handleToggleBookmark,
  loginStatus,
}: LessonPlanCard) {
  const isHydrated = useHydrated();
  const lessonChips = chips!.map((lessonChip) => (
    <Chip
      key={lessonChip.title}
      size="small"
      avatar={<Avatar>{lessonChip.category}</Avatar>}
      label={lessonChip.title}
    />
  ));

  // let bookmarkButton = hydrateAndSelectBookmarkButton(
  //   isHydrated,
  //   loginStatus,
  //   isBookmarked,
  //   handleToggleBookmark,
  //   id
  // );

  return (
    <Card
      sx={{
        borderRadius: 4,
      }}>
      <Image
        alt={imageAlt}
        src={imageURL}
        width={640}
        height={480}
        style={{
          maxWidth: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Stack
          marginTop={0.5}
          direction="row"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
          alignItems="center">
          <Typography variant="overline" component="div">
            {duration}
          </Typography>
          <Circle
            sx={{
              fontSize: "4px",
              verticalAlign: "middle",
            }}
          />
          <Typography variant="overline" component="div">
            Prep: {prepTime}
          </Typography>
          <Circle
            sx={{
              fontSize: "4px",
              verticalAlign: "middle",
            }}
          />
          <Typography variant="body2" component="div">
            {level}
          </Typography>

          {isPremium && (
            <Circle
              sx={{
                fontSize: "4px",
                verticalAlign: "middle",
              }}
            />
          )}
          {isPremium && <Diamond color="secondary" />}
        </Stack>
        <Divider sx={{ borderBottomWidth: 1, mb: 1 }} />
        <Stack
          direction="row"
          spacing={0.5}
          useFlexGap
          flexWrap="wrap"
          alignItems="center">
          {lessonChips}
        </Stack>
        <Divider sx={{ borderBottomWidth: 1, mt: 1 }} />

        <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: 2 }}>
        <Button
          href={`/lessonplans/${id}`}
          variant={"contained"}
          size="small"
          startIcon={<ArrowForward />}
          component={SecureNextLink}
          sx={{
            marginRight: 1,
          }}>
          View
        </Button>
        {isHydrated && (
          <LessonPlanCardBookmarkButton
            loginStatus={loginStatus}
            id={id}
            isBookmarked={isBookmarked}
            handleToggleBookmark={handleToggleBookmark}
          />
        )}
      </CardActions>
    </Card>
  );
}
