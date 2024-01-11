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

export default function LessonPlanCard({
  id,
  title,
  description,
  isPremium,
  imageURL,
  imageAlt,
  chips,
}: LessonPlan) {
  console.log("id in LessonPlanCard");
  console.log(id);

  const lessonChips = chips.map((lessonChip) => (
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
            90 mins
          </Typography>
          <Circle
            sx={{
              fontSize: "4px",
              verticalAlign: "middle",
            }}
          />
          <Typography variant="overline" component="div">
            Prep 10 mins
          </Typography>
          <Circle
            sx={{
              fontSize: "4px",
              verticalAlign: "middle",
            }}
          />
          <Typography variant="body2" component="div">
            A1
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
      <CardActions>
        <Button
          href={`/lessonplans/${id}`}
          variant={"contained"}
          size="small"
          component={SecureNextLink}
          sx={{
            mr: 1,
          }}>
          View
        </Button>
        <Button
          onClick={() => console.log("hello from Share")}
          variant={"outlined"}
          size="small"
          sx={{
            mr: "auto",
          }}>
          Share
        </Button>

        <IconButton aria-label="bookmark">
          <Bookmark />
        </IconButton>
      </CardActions>
    </Card>
  );
}
