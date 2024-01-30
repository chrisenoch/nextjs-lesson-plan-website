import { Stack, SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";
import SVG from "../SVGs/SVG";
import { underline } from "../SVGs/Paths";
import { SVGPath } from "../SVGs/StyledSVGPath";
import { setSXValues } from "@/component-functions/set-sx-values";

export default function SearchLessonPlans({
  searchTitle,
  sxOuterContainer,
  sxInnerContainer,
  sxTitle,
  children,
}: {
  searchTitle: string;
  sxOuterContainer?: SxProps<Theme>;
  sxInnerContainer?: SxProps<Theme>;
  sxTitle?: SxProps<Theme>;
  children: ReactNode;
}) {
  const sxOuterContainerDefault: SxProps<Theme> = {
    maxWidth: "900px",
    //mt: 10,
    mb: 4,
    mx: "auto",
  };
  const sxInnerContainerDefault: SxProps<Theme> = { alignSelf: "center" };
  const sxTitleDefault: SxProps<Theme> = { display: "inline-block" };

  const { sxOuterContainerFinal, sxInnerContainerFinal, sxTitleFinal } =
    setSXValues([
      {
        userValues: sxOuterContainer,
        defaultValues: sxOuterContainerDefault,
        sxName: "OuterContainer",
      },
      {
        userValues: sxInnerContainer,
        defaultValues: sxInnerContainerDefault,
        sxName: "InnerContainer",
      },
      {
        userValues: sxTitle,
        defaultValues: sxTitleDefault,
        sxName: "Title",
      },
    ]);

  return (
    <Stack spacing={4} sx={sxOuterContainerFinal}>
      <Stack sx={sxInnerContainerFinal}>
        <Typography variant="h4" component="h3" sx={sxTitleFinal}>
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
