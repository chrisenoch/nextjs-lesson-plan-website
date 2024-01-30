import { setSXValues } from "@/component-functions/set-sx-values";
import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";

export default function CurvedUnderlineTitle({
  component,
  variant,
  title,
  sxUnderline,
  color = "primary.main",
}: {
  component: any;
  variant: any;
  title: string;
  sxUnderline?: SxProps<Theme>;
  color?: string;
}) {
  const sxUnderlineDefault: SxProps<Theme> = {
    position: "absolute",
    bottom: "-24px",
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

  const { sxUnderlineFinal } = setSXValues([
    {
      userValues: sxUnderline,
      defaultValues: sxUnderlineDefault,
      sxName: "Underline",
    },
  ]);

  return (
    <Typography
      component={component}
      variant={variant}
      position={"relative"}
      display="inline-block">
      {title}
      <Box component="span" sx={sxUnderlineFinal}></Box>
    </Typography>
  );
}
