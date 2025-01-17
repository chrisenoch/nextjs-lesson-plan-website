"use client";

import GeneralError from "@/components/errors-c/GeneralError";
import NotificationBox from "@/components/NotificationBox";
import SecureNextLink from "@/components/SecureNextLink";
import { Box, Button, Stack } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <GeneralError
      title="Sorry, there has been an error"
      message="Please try reloading the page or contact our support team."
      reset={reset}
    />
  );
}
