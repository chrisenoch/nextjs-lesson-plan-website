import * as React from "react";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import ChecklistIcon from "@mui/icons-material/Checklist";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import ReduxProvider from "@/components/ReduxStore/ReduxProvider";
import EssentialClientConfig from "@/components/EssentialClientConfig";

export const metadata = {
  title: "Next.js App Router + Material UI v5",
  description: "Next.js App Router + Material UI v5",
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: "Home", href: "/", icon: HomeIcon },
  { text: "Starred", href: "/starred", icon: StarIcon },
  { text: "Tasks", href: "/tasks", icon: ChecklistIcon },
];

const PLACEHOLDER_LINKS = [
  { text: "Settings", icon: SettingsIcon },
  { text: "Support", icon: SupportIcon },
  { text: "Logout", icon: LogoutIcon },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeRegistry>
            <EssentialClientConfig>
              <ResponsiveAppBar
                DRAWER_WIDTH={DRAWER_WIDTH}
                PLACEHOLDER_LINKS={PLACEHOLDER_LINKS}
                LINKS={LINKS}
              />
              <Box
                component="main"
                //originally: bgcolor: "background.default",
                sx={{
                  //height: "100%",
                  height: "fit-content",
                  minHeight: "100vh",
                  flexGrow: 1,
                  px: 3,
                  pb: 3,
                  pt: 16,
                }}>
                {children}
              </Box>
            </EssentialClientConfig>
          </ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
