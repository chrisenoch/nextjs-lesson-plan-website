import { setSXValues } from "@/component-functions/set-sx-values";
import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function CurvedUnderlineTitle({
  component,
  variant,
  title,
  sxUnderline,
  sxTypography,
  typographyId,
  color = "primary.main",
  children,
}: {
  component: any;
  variant: any;
  title: string;
  sxUnderline?: SxProps<Theme>;
  sxTypography?: SxProps<Theme>;
  color?: string;
  children?: ReactNode;
  typographyId?: string;
}) {
  const sxUnderlineDefault: SxProps<Theme> = {
    position: "absolute",
    bottom: "-28px",
    left: "0",
    height: "30px",
    width: "100%",
    border: "solid 8px",
    borderTopColor: `${color}`,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderRadius: "50%",
  };

  const sxTypographyDefault: SxProps<Theme> = {
    display: "inline-block",
  };

  const { sxUnderlineFinal, sxTypographyFinal } = setSXValues([
    {
      userValues: sxUnderline,
      defaultValues: sxUnderlineDefault,
      sxName: "Underline",
    },
    {
      userValues: sxTypography,
      defaultValues: sxTypographyDefault,
      sxName: "Typography",
    },
  ]);

  return (
    <Typography
      id={typographyId ? typographyId : ""}
      component={component}
      variant={variant}
      position={"relative"}
      sx={sxTypographyFinal}>
      {title}
      <Box component="span" sx={sxUnderlineFinal}></Box>
      {children}
    </Typography>
  );
}
