"use client";

import NotificationBox from "@/components/NotificationBox";
import SecureNextLink from "@/components/Utils/SecureNextLink";
import { Box, Button, Stack } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box>
      <NotificationBox
        title="Sorry, there has been an error."
        titleComponent={"h1"}
        titleVariant={"h3"}
        message="Please try reloading the page or contact our support team."
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
    </Box>
  );
}
