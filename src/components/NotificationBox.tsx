"use client";

import { setSXValues } from "@/component-functions/set-sx-values";
import { Stack, Typography, Box, SxProps, Theme } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import { ReactElement, useEffect, useRef, useState } from "react";

/**
 *
 * @param timer - timeBeforeDestroyedInMs - time before the NotificationBox is removed from the DOM. equalityProp - when the equality prop changes, the NotificationBox is readded to the DOM and the timer to destroy it restarts.
 */
export default function NotificationBox({
  title,
  message,
  sxOuterContainer,
  sxInnerContainer,
  sxTitle,
  sxMessage,
  titleComponent,
  titleVariant,
  variant,
  children,
  timer,
  ...props
}: {
  title?: string;
  titleComponent?: any;
  titleVariant?: any;
  message: string;
  sxOuterContainer?: SxProps<Theme>;
  sxInnerContainer?: SxProps<Theme>;
  sxTitle?: SxProps<Theme>;
  sxMessage?: SxProps<Theme>;
  variant?: "success" | "info" | "error";
  children?: ReactElement;
  timer?: { timeBeforeDestroyedInMs: number; equalityProp: any };
}) {
  const [shouldBeInDOM, setShouldBeInDOM] = useState<boolean>(true);
  const [previousEqualityProp, setPreviousEqualityProp] = useState<any>(
    timer?.equalityProp
  );
  const hasTimerRun = useRef<boolean>(false);

  useEffect(() => {
    let timeOut: any;
    if (
      timer &&
      (!hasTimerRun.current || previousEqualityProp !== timer.equalityProp)
    ) {
      hasTimerRun.current = true;
      timeOut = setTimeout(() => {
        setShouldBeInDOM(false);
        setPreviousEqualityProp(timer.equalityProp);
      }, timer.timeBeforeDestroyedInMs);
    }

    return () => {
      hasTimerRun.current = false;
      timeOut && clearTimeout(timeOut);
    };
  }, [previousEqualityProp, timer]);

  let titleComponentFinal;
  if (!titleComponent) {
    titleComponentFinal = "p";
  } else {
    titleComponentFinal = titleComponent;
  }

  let titleVariantFinal;
  if (!titleVariant) {
    titleVariantFinal = "h4";
  } else {
    titleVariantFinal = titleVariant;
  }

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

  if (shouldBeInDOM) {
    return (
      <Stack {...props} sx={sxOuterContainerFinal}>
        <Stack sx={sxInnerContainerFinal}>
          {title && (
            <Typography
              component={titleComponentFinal}
              variant={titleVariantFinal}
              sx={sxTitleFinal}>
              {title}{" "}
            </Typography>
          )}
          <Box component="p" sx={sxMessageFinal}>
            {message}
          </Box>
          {children}
        </Stack>
      </Stack>
    );
  } else {
    return null;
  }
}
