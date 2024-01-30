import { Stack, Typography, Box, SxProps, Theme } from "@mui/material";

export default function NotificationBox({
  title,
  message,
  sxOuterContainer,
  sxInnerContainer,
  sxTitle,
  sxMessage,
}: {
  title: string;
  message: string;
  sxOuterContainer?: SxProps<Theme>;
  sxInnerContainer?: SxProps<Theme>;
  sxTitle?: SxProps<Theme>;
  sxMessage?: SxProps<Theme>;
}) {
  let sxOuterContainerFinal: SxProps<Theme> = {
    alignItems: "center",
    maxWidth: "900px",
    mt: 6,
    mx: "auto",
  };

  let sxInnerContainerFinal: SxProps<Theme> = {
    alignItems: "center",
    maxWidth: "90%",
    borderRadius: 4,
    border: "1px solid",
    borderColor: "text.secondary",
  };

  let sxTitleFinal: SxProps<Theme> = {
    maxWidth: "90%",
    display: "inline-block",
    marginTop: 2,
  };

  let sxMessageFinal: SxProps<Theme> = {
    maxWidth: "90%",
    display: "inline-block",
  };

  ({
    sxOuterContainerFinal,
    sxInnerContainerFinal,
    sxTitleFinal,
    sxMessageFinal,
  } = setSXValues(
    sxOuterContainer,
    sxOuterContainerFinal,
    sxInnerContainer,
    sxInnerContainerFinal,
    sxTitle,
    sxTitleFinal,
    sxMessage,
    sxMessageFinal
  ));

  return (
    <Stack sx={sxOuterContainerFinal}>
      <Stack sx={sxInnerContainerFinal}>
        <Typography component="p" variant="h4" sx={sxTitleFinal}>
          {title}{" "}
        </Typography>
        <Box component="p" sx={sxMessageFinal}>
          {message}
        </Box>
      </Stack>
    </Stack>
  );
}
function setSXValues(
  sxOuterContainer: SxProps<Theme> | undefined,
  sxOuterContainerFinal: SxProps<Theme>,
  sxInnerContainer: SxProps<Theme> | undefined,
  sxInnerContainerFinal: SxProps<Theme>,
  sxTitle: SxProps<Theme> | undefined,
  sxTitleFinal: SxProps<Theme>,
  sxMessage: SxProps<Theme> | undefined,
  sxMessageFinal: SxProps<Theme>
) {
  if (sxOuterContainer) {
    sxOuterContainerFinal = {
      ...sxOuterContainerFinal,
      ...sxOuterContainer,
    } as SxProps<Theme>;
  }

  if (sxInnerContainer) {
    sxInnerContainerFinal = {
      ...sxInnerContainerFinal,
      ...sxInnerContainer,
    } as SxProps<Theme>;
  }

  if (sxTitle) {
    sxTitleFinal = { ...sxTitleFinal, ...sxTitle } as SxProps<Theme>;
  }

  if (sxMessage) {
    sxMessageFinal = { ...sxMessageFinal, ...sxMessage } as SxProps<Theme>;
  }
  return {
    sxOuterContainerFinal,
    sxInnerContainerFinal,
    sxTitleFinal,
    sxMessageFinal,
  };
}
