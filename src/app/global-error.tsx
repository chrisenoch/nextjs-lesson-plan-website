"use client";

import GeneralError from "@/components/Errors/GeneralError";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { Box } from "@mui/material";

export const metadata = {
  title: "Lesson Planz",
  description: "Get fun and creative lesson plans for all levels.",
};

export default function GlobalError({ reset }: { reset: () => void }) {
  //To do: Style this page
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Box paddingTop={12}></Box>
          <GeneralError
            title="Sorry, there has been an error"
            message="Please try reloading the page or contact our support team."
            reset={reset}
          />
        </ThemeRegistry>
      </body>
    </html>
  );
}
