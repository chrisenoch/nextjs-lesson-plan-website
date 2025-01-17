import React from "react";
import {
  act,
  RenderResult,
  render as testingLibraryRender,
} from "@testing-library/react";
import ReduxProvider from "@/components/redux-store-c/ReduxProvider";
import ThemeRegistry from "@/components/theme-registry-c/ThemeRegistry";
import EssentialClientConfig from "@/components/EssentialClientConfig";

export function render(component: React.ReactNode) {
  return testingLibraryRender(<>{component}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <ReduxProvider>
        <ThemeRegistry>{children}</ThemeRegistry>
      </ReduxProvider>
    ),
  });
}

export async function renderWithAct(component: React.ReactNode) {
  const result = await act(async () => {
    return testingLibraryRender(<>{component}</>, {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ReduxProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </ReduxProvider>
      ),
    });
  });
  return result;
}

export async function renderWithEssentialClientConfig(
  component: React.ReactNode
) {
  const result = await act(async () => {
    return testingLibraryRender(<>{component}</>, {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ReduxProvider>
          <EssentialClientConfig>
            <ThemeRegistry>{children}</ThemeRegistry>
          </EssentialClientConfig>
        </ReduxProvider>
      ),
    });
  });
  return result;
}

// export async function renderWithAct(component: React.ReactNode) {
//   let result: RenderResult | null = null;
//   await act(async () => {
//     result = render(component);
//   });
//   return result!;
// }
