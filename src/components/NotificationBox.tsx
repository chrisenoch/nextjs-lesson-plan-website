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
    maxWidth: "900px",
    mt: 3,
    mx: "auto",
  };

  const sxInnerContainerDefault: SxProps<Theme> = {
    alignItems: "center",
    borderRadius: 4,
    border: "1px solid",
    borderColor: "text.secondary",
    marginX: 2,
  };

  const sxTitleDefault: SxProps<Theme> = {
    marginTop: 2,
    marginX: 2,
  };

  const sxMessageDefault: SxProps<Theme> = {
    marginX: 2,
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
