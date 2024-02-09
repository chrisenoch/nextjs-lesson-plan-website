import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  IconButton,
  Divider,
  Stack,
  Chip,
  SxProps,
  Theme,
  CardMedia,
} from "@mui/material";
import Circle from "@mui/icons-material/Circle";
import Diamond from "@mui/icons-material/Diamond";
import SecureNextLink from "../Utils/SecureNextLink";
import { LoadingButton } from "@mui/lab";
import { LessonPlanCard } from "@/models/types/LessonPlans/LessonPlanCard";
import { ArrowForward, Done, RocketLaunch } from "@mui/icons-material";
import { useHydrated } from "@/customHooks/useHydrated";
import LessonPlanCardBookmarkButton from "./LessonPlanCardBookmarkButton";
import { log } from "util";
import { setSXValues } from "@/component-functions/set-sx-values";

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
  sxImage,
  sxDescription,
  loginStatus,
}: LessonPlanCard) {
  const isHydrated = useHydrated();

  const sxImageDefault: SxProps<Theme> = {
    height: "200px",
  };
  const sxDescriptionDefault: SxProps<Theme> = {
    mt: 1,
  };

  const { sxImageFinal, sxDescriptionFinal } = setSXValues([
    {
      userValues: sxImage,
      defaultValues: sxImageDefault,
      sxName: "Image",
    },
    {
      userValues: sxDescription,
      defaultValues: sxDescriptionDefault,
      sxName: "Description",
    },
  ]);

  console.log("sxImageFinal");
  console.log(sxImageFinal);

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
      <CardMedia sx={sxImageFinal}>
        <Image
          alt={imageAlt}
          src={imageURL}
          width={640}
          height={480}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </CardMedia>

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

        <Typography
          variant="body2"
          sx={sxDescriptionFinal}
          color="text.secondary">
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
        {isPremium && (
          <Diamond
            sx={{
              marginLeft: "auto",
            }}
            color="secondary"
          />
        )}
      </CardActions>
    </Card>
  );
}
