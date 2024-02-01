import { setSXValues } from "@/component-functions/set-sx-values";
import { Stack, Typography, Box, SxProps, Theme } from "@mui/material";

export default function NotificationBox({
  title,
  message,
  sxOuterContainer,
  sxInnerContainer,
  sxTitle,
  sxMessage,
}: {
  title?: string;
  message: string;
  sxOuterContainer?: SxProps<Theme>;
  sxInnerContainer?: SxProps<Theme>;
  sxTitle?: SxProps<Theme>;
  sxMessage?: SxProps<Theme>;
}) {
  const sxOuterContainerDefault: SxProps<Theme> = {
    alignItems: "center",
    maxWidth: "900px",
    width: "100%",
    mt: 3,
    mx: "auto",
  };

  const sxInnerContainerDefault: SxProps<Theme> = {
    alignItems: "center",
    maxWidth: "90%",
    width: "100%",
    borderRadius: 4,
    border: "1px solid",
    borderColor: "text.secondary",
  };

  const sxTitleDefault: SxProps<Theme> = {
    maxWidth: "90%",
    display: "inline-block",
    marginTop: 2,
  };

  const sxMessageDefault: SxProps<Theme> = {
    maxWidth: "90%",
    display: "inline-block",
  };

  //To do: Create a reusable function which sets sx props.
  const {
    sxOuterContainerFinal,
    sxInnerContainerFinal,
    sxTitleFinal,
    sxMessageFinal,
  } = setSXValues([
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
    {
      userValues: sxMessage,
      defaultValues: sxMessageDefault,
      sxName: "Message",
    },
  ]);

  return (
    <Stack sx={sxOuterContainerFinal}>
      <Stack sx={sxInnerContainerFinal}>
        {title && (
          <Typography component="p" variant="h4" sx={sxTitleFinal}>
            {title}{" "}
          </Typography>
        )}
        <Box component="p" sx={sxMessageFinal}>
          {message}
        </Box>
      </Stack>
    </Stack>
  );
}
