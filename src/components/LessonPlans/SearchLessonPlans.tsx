import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import SVG from "../SVGs/SVG";
import { underline } from "../SVGs/Paths";
import { SVGPath } from "../SVGs/StyledSVGPath";

export default function SearchLessonPlans({
  searchTitle,
  children,
}: {
  searchTitle: string;
  children: ReactNode;
}) {
  return (
    <Stack
      spacing={4}
      sx={{
        maxWidth: "900px",
        mt: 10,
        mb: 4,
        mx: "auto",
      }}>
      <Stack alignSelf={"center"}>
        <Typography
          id="search-lesson-plans"
          variant="h4"
          component="h3"
          display={"inline-block"}>
          {searchTitle}
        </Typography>
        <SVG
          width="300px"
          height="21.5px"
          viewBox={{ minY: 0, minX: 0, height: 21.5, width: 445.5 }}>
          <SVGPath d={underline} sx={{ fill: "orange" }} />
        </SVG>
      </Stack>

      {children}
    </Stack>
  );
}
