"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Button,
  Container,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  selectGetAccessTokenWithRefreshTokenOnAppMount,
  selectLoginStatus,
  userLogout,
} from "@/store";
import SecureNextLink from "./SecureNextLink";
import InsecureNextLink from "next/link";
import { selectLogoutCount } from "@/store/slices/with-thunks/auth-slice";

export default function ResponsiveAppBar({
  DRAWER_WIDTH,
  LINKS,
  PLACEHOLDER_LINKS,
}) {
  console.log("Responsive AppBar mounts");
  const loginStatus: "LOGIN_NOT_PROCESSED" | "LOGGED_IN" | "LOGGED_OUT" =
    useSelector(selectLoginStatus);

  const dispatch = useDispatch<AppDispatch>();

  const navItems = [
    { title: "Lesson Plans", href: "/lessonplans" },
    { title: "My Jobs", href: "/my-jobs" },
    { title: "All Jobs", href: "/all-jobs" },
  ];
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  function ElevationScroll({ children }: { children: React.ReactElement }) {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  return (
    <>
      <ElevationScroll>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "grey.100",
            color: "primary.main",
          }}>
          <Toolbar
            sx={{
              maxWidth: "1200px",
              width: "100%",
              margin: "0 auto",
            }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
              Lesson Planz
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
              }}>
              {navItems.map((item) => {
                return (
                  <Button
                    key={item.title}
                    href={item.href}
                    component={SecureNextLink}>
                    {item.title}
                  </Button>
                );
              })}
              {/* show login, logout or loading button depending on the status */}
              {loginStatus === "LOGGED_IN" && (
                <Button
                  key="Logout"
                  onClick={() => {
                    dispatch(userLogout());
                  }}>
                  Logout
                </Button>
              )}
              {loginStatus === "LOGGED_OUT" && (
                <Button
                  key="Login"
                  href={"/auth/signin"}
                  component={InsecureNextLink}>
                  {/* We don't need to check the login route in middleware */}
                  Login
                </Button>
              )}
              {loginStatus === "LOGIN_NOT_PROCESSED" && (
                <LoadingButton
                  key={"loading-placeholder"}
                  loading
                  disabled
                  variant="outlined">
                  {/* could be any value here as it is not shown */}
                  Login
                </LoadingButton>
              )}
              <Button key="Test" href={"/#search-lesson-plans"}>
                Test
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}>
          <Divider />
          <List>
            {LINKS.map(({ text, href, icon: Icon }) => (
              <ListItem key={href} disablePadding>
                <ListItemButton component={SecureNextLink} href={href}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ mt: "auto" }} />
          <List>
            {PLACEHOLDER_LINKS.map(({ text, icon: Icon }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </nav>
    </>
  );
}
