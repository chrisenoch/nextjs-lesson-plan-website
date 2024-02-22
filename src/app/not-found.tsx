"use client";

import GeneralError from "@/components/errors/GeneralError";

export default function NotFound({ reset }: { reset: () => void }) {
  return (
    <GeneralError
      title="Page not found"
      message="Sorry the page could not be found."
      reset={reset}
    />
  );
}
