"use client";

import NotificationBox from "@/components/NotificationBox";
import SecureNextLink from "@/components/SecureNextLink";
import { Button, Stack } from "@mui/material";

export default function GeneralError({
  reset,
  title,
  message,
}: {
  reset: () => void;
  title: string;
  message: string;
}) {
  return (
    <NotificationBox
      title={title}
      titleComponent={"h1"}
      titleVariant={"h3"}
      message={message}
      sxMessage={{
        fontSize: "1.125rem",
        marginTop: 3,
      }}
      sxInnerContainer={{ borderColor: "transparent" }}>
      <Stack direction="row" gap={2} marginTop={2}>
        <Button variant="outlined" onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="outlined" component={SecureNextLink} href={"/"}>
          Back to home
        </Button>
      </Stack>
    </NotificationBox>
  );
}
