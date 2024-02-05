"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  //To do: Style this page
  return (
    <html>
      <body>
        <h2>Sorry, there has been an error.</h2>
      </body>
    </html>
  );
}
