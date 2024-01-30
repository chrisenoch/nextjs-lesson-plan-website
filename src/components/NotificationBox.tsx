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
  const sxOuterContainerDefault: SxProps<Theme> = {
    alignItems: "center",
    maxWidth: "900px",
    mt: 6,
    mx: "auto",
  };

  const sxInnerContainerDefault: SxProps<Theme> = {
    alignItems: "center",
    maxWidth: "90%",
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
  } = setSXValues(
    sxOuterContainer,
    sxOuterContainerDefault,
    sxInnerContainer,
    sxInnerContainerDefault,
    sxTitle,
    sxTitleDefault,
    sxMessage,
    sxMessageDefault
  );

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

//To do: Create a reusable function which sets sx props.
function setSXValues(
  sxOuterContainer: SxProps<Theme> | undefined,
  sxOuterContainerDefault: SxProps<Theme>,
  sxInnerContainer: SxProps<Theme> | undefined,
  sxInnerContainerDefault: SxProps<Theme>,
  sxTitle: SxProps<Theme> | undefined,
  sxTitleDefault: SxProps<Theme>,
  sxMessage: SxProps<Theme> | undefined,
  sxMessageDefault: SxProps<Theme>
) {
  let sxOuterContainerFinal = sxOuterContainerDefault;
  let sxInnerContainerFinal = sxInnerContainerDefault;
  let sxTitleFinal = sxTitleDefault;
  let sxMessageFinal = sxMessageDefault;

  if (sxOuterContainer) {
    sxOuterContainerFinal = {
      ...sxOuterContainerDefault,
      ...sxOuterContainer,
    } as SxProps<Theme>;
  }

  if (sxInnerContainer) {
    sxInnerContainerFinal = {
      ...sxInnerContainerDefault,
      ...sxInnerContainer,
    } as SxProps<Theme>;
  }

  if (sxTitle) {
    sxTitleFinal = { ...sxTitleDefault, ...sxTitle } as SxProps<Theme>;
  }

  if (sxMessage) {
    sxMessageFinal = { ...sxMessageDefault, ...sxMessage } as SxProps<Theme>;
  }
  return {
    sxOuterContainerFinal,
    sxInnerContainerFinal,
    sxTitleFinal,
    sxMessageFinal,
  };
}
