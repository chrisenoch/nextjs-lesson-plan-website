"use client";

import { useHydrated } from "@/customHooks/useHydrated";
import LoadingSpinner from "../Presentation/LoadingSpinner";
import { Box } from "@mui/material";

// If a child component needs useHydrated# but also needs to use React hooks, then this is not allowed as React hooks cannot be used conditionally.
// One solution is to wrap the child components that need hooks with this ShowOnHydrated component.
// Another solution is to have the Redux data-fetching logic in a parent component, pass the fetched data from Redux via props to the child component
// and use the useHydrated hook in the child component without other hooks.
// A third solution is to place the if(isHydrated) condition below all react hooks.
export default function ShowOnHydrate({ children }: { children: any }) {
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return (
      <Box display="flex" justifyContent={"center"}>
        <LoadingSpinner />
      </Box>
    );
  } else {
    return <>{children}</>;
  }
}
