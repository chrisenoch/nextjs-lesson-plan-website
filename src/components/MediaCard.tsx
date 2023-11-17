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
} from "@mui/material";
import { red } from "@mui/material/colors";
import Circle from "@mui/icons-material/Circle";

export default function MediaCard({
  heading,
  text,
  imageURL,
  alt,
}: {
  heading: string;
  text: string;
  imageURL: string;
  alt: string;
}) {
  return (
    <Card>
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
        </Stack>
        <Divider sx={{ borderBottomWidth: 1 }} />
        <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant={"contained"} size="small">
          View
        </Button>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}
