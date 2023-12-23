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
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  userLogout,
  getAccessTokenWithRefreshTokenOnAppMount,
} from "@/store";

import useAutoLogoutWhenJwtTokenExpires from "@/customHooks/useAutoLogoutWhenJwtTokenExpires";
import { LogoutWarning } from "./auth/LogoutWarning";
import SecureNextLink from "./SecureNextLink";
import InsecureNextLink from "next/link";

export default function ResponsiveAppBar({
  DRAWER_WIDTH,
  LINKS,
  PLACEHOLDER_LINKS,
}) {
  console.log("Responsive AppBar mounts");
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, userInfo } = useSelector((state) => state.authSlice);
  //useAutoLogout(1_800_000);
  const renderModal = useAutoLogoutWhenJwtTokenExpires(30_000, 10_000); //240_000 - 4 mins // 30_000 - 30 secs //10_000 - 10 secs
  const [previousRenderModal, setPreviousRenderModal] = useState<{
    hasAutoLoggedOut: boolean;
  }>(renderModal);
  const [showLogoutWarning, setShowLogoutWarning] = useState<boolean>(false);

  //Avoids using an effect and saves a render.
  if (renderModal !== previousRenderModal) {
    if (renderModal.hasAutoLoggedOut) {
      setShowLogoutWarning(true);
      renderModal.hasAutoLoggedOut = false;
    }
    setPreviousRenderModal(renderModal);
  }

  // automatically authenticate user if refresh token cookie and access token cookies are found on app mount
  useEffect(() => {
    dispatch(getAccessTokenWithRefreshTokenOnAppMount());
  }, [dispatch]);

  const navItems = [
    { title: "Lesson Plans", href: "/lessonplans" },
    { title: "Jobs", href: "/jobs" },
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
      <LogoutWarning
        open={showLogoutWarning}
        handleClose={() => {
          setShowLogoutWarning(false);
        }}
      />
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
              {userInfo && !isLoading && (
                <Button
                  key="Logout"
                  onClick={() => {
                    dispatch(userLogout());
                  }}>
                  Logout
                </Button>
              )}
              {!userInfo && !isLoading && (
                <Button
                  key="Login"
                  href={"/auth/signin"}
                  component={InsecureNextLink}>
                  {/* We don't need to check the login route in middleware */}
                  Login
                </Button>
              )}
              {isLoading && (
                <LoadingButton
                  key={"loading-placeholder"}
                  loading
                  disabled
                  variant="outlined">
                  {/* could be any value here as it is not shown */}
                  Login
                </LoadingButton>
              )}
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
