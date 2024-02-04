import { setSXValues } from "@/component-functions/set-sx-values";
import { Stack, Typography, Box, SxProps, Theme } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";

export default function NotificationBox({
  title,
  message,
  sxOuterContainer,
  sxInnerContainer,
  sxTitle,
  sxMessage,
  variant,
}: {
  title?: string;
  message: string;
  sxOuterContainer?: SxProps<Theme>;
  sxInnerContainer?: SxProps<Theme>;
  sxTitle?: SxProps<Theme>;
  sxMessage?: SxProps<Theme>;
  variant?: "success" | "info" | "error";
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
    borderColor: `${
      variant === "error"
        ? red[100]
        : variant === "info"
        ? blue[100]
        : variant === "success"
        ? green[100]
        : "text.secondary"
    }`,
    backgroundColor: `${
      variant === "error"
        ? "#fff8f9"
        : variant === "info"
        ? "#f7fbfe"
        : variant === "success"
        ? green[50]
        : "transparent"
    }`,

    marginX: 2,
  };

  const sxTitleDefault: SxProps<Theme> = {
    marginTop: 2,
    marginX: 2,
    color: `${
      variant === "error"
        ? red[800]
        : variant === "info"
        ? blue[800]
        : variant === "success"
        ? green[900]
        : "inherit"
    }`,
  };

  const sxMessageDefault: SxProps<Theme> = {
    marginX: 2,
    color: `${
      variant === "error"
        ? red[800]
        : variant === "info"
        ? blue[800]
        : variant === "success"
        ? green[900]
        : "inherit"
    }`,
  };

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
