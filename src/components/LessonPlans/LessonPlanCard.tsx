import * as React from "react";
import Image from "next/image";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  Stack,
  Box,
  Chip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Circle from "@mui/icons-material/Circle";
import Bookmark from "@mui/icons-material/Bookmark";
import Diamond from "@mui/icons-material/Diamond";
import { LessonPlanType } from "../models/types/lessonPlanType";

export default function MediaCard({
  heading,
  text,
  imageURL,
  alt,
  chips,
}: {
  heading: string;
  text: string;
  imageURL: string;
  alt: string;
  chips: { title: string; category: LessonPlanType }[];
}) {
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
        alt={alt}
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
          {heading}
        </Typography>
        <Stack
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

          <Circle
            sx={{
              fontSize: "4px",
              verticalAlign: "middle",
            }}
          />
          <IconButton aria-label="get premium">
            <Diamond color="secondary" />
          </IconButton>
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
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => console.log("hello from View")}
          variant={"contained"}
          size="small">
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
