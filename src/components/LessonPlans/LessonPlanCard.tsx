import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, IconButton, Divider, Stack, Chip } from "@mui/material";
import Circle from "@mui/icons-material/Circle";
import Bookmark from "@mui/icons-material/Bookmark";
import Diamond from "@mui/icons-material/Diamond";
import { LessonPlan } from "@/models/types/LessonPlan";
import SecureNextLink from "../SecureNextLink";
import { LoadingButton } from "@mui/lab";
import { LessonPlanBookmarkStatus } from "@/models/types/LessonPlanBookmarkStatus";
import { lessonPlanCard } from "@/models/types/LessonPlanCard";
import {
  ArrowForward,
  BookmarkBorder,
  Done,
  RocketLaunch,
} from "@mui/icons-material";

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
}: lessonPlanCard) {
  const lessonChips = chips!.map((lessonChip) => (
    <Chip
      key={lessonChip.title}
      size="small"
      avatar={<Avatar>{lessonChip.category}</Avatar>}
      label={lessonChip.title}
    />
  ));

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
          component={SecureNextLink}>
          View
        </Button>

        {isBookmarked === "IS_BOOKMARKED" && (
          <Button variant="outlined" size="small" startIcon={<Done />}>
            Saved
          </Button>
        )}
        {isBookmarked === "IS_NOT_BOOKMARKED" && (
          <Button variant="outlined" size="small" startIcon={<RocketLaunch />}>
            Save
          </Button>
        )}
        {isBookmarked === "BOOKMARKS_NOT_READY" && (
          <LoadingButton sx={{ px: 0 }} loading disabled variant="outlined">
            {/* value here affects the button size */}Save
          </LoadingButton>
        )}
      </CardActions>
    </Card>
  );
}
