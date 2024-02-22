import * as React from "react";
import Box from "@mui/material/Box";
import ThemeRegistry from "@/components/theme-registry-c/ThemeRegistry";
import ResponsiveAppBar from "@/components/layout-c/ResponsiveAppBar";
import ReduxProvider from "@/components/redux-store-c/ReduxProvider";
import EssentialClientConfig from "@/components/EssentialClientConfig";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import BadgeIcon from "@mui/icons-material/Badge";

export const metadata = {
  title: "Lesson Planz",
  description: "Get fun and creative lesson plans for all levels.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const drawerWidth = 240;
  const burgerTopLinks = [
    { text: "Home", href: "/", icon: HomeIcon },
    { text: "Lesson Plans", href: "/lessonplans", icon: SchoolIcon },
    { text: "Saved Lesson Plans", href: "/lessonplans/saved", icon: StarIcon },
    { text: "Jobs", href: "/all-jobs", icon: WorkIcon },
    { text: "My Jobs", href: "/my-jobs", icon: BadgeIcon },
  ];
  const navBarItems = [
    { title: "All Jobs", href: "/all-jobs" },
    { title: "My Jobs", href: "/my-jobs" },
  ];

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeRegistry>
            <EssentialClientConfig>
              <ResponsiveAppBar
                drawerWidth={drawerWidth}
                burgerTopLinks={burgerTopLinks}
                navBarItems={navBarItems}
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
                  pt: {
                    xs: 10,
                    "430c": 10.5,
                    sm: 11.5,
                    md: 13,
                    lg: 13.5,
                    xl: 16,
                  },
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
