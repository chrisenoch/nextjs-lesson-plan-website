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
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  checkAuthenticated,
  userLogout,
} from "@/store/slices/with-thunks/auth-thunks";
import useAutoLogoutWhenJwtTokenExpires from "@/customHooks/useAutoLogoutWhenJwtTokenExpires";

export default function ResponsiveAppBar({
  DRAWER_WIDTH,
  LINKS,
  PLACEHOLDER_LINKS,
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, userInfo } = useSelector((state) => state.auth);
  //useAutoLogout(1_800_000);
  const renderModal = useAutoLogoutWhenJwtTokenExpires(30_000, 10_000); //30_000 - 30 secs // 10_000 - 10 secs
  console.log("renderModal " + renderModal.hasAutoLoggedOut);

  // automatically authenticate user if token cookie is found
  useEffect(() => {
    dispatch(checkAuthenticated());
  }, [dispatch]);

  const navItems = [
    { title: "Lesson Plans", href: "/lessonplans" },
    { title: "Jobs", href: "/jobs" },
    { title: "Login", href: "/auth/signin" },
    { title: "Logout", href: "/auth/logout" },
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
            zIndex: 2000,
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
              {navItems
                .filter((item) => {
                  if (item.title === "Login" && userInfo) {
                    return false;
                  }
                  if (item.title === "Logout" && (!userInfo || isLoading)) {
                    return false;
                  }
                  return true;
                })
                .map((item) => {
                  if (item.title === "Login" && isLoading) {
                    return (
                      <LoadingButton
                        key={item.title}
                        loading
                        disabled
                        variant="outlined">
                        Login
                      </LoadingButton>
                    );
                  }

                  if (item.title === "Logout") {
                    return (
                      <Button
                        key={item.title}
                        onClick={() => dispatch(userLogout())}>
                        {item.title}
                      </Button>
                    );
                  }

                  return (
                    <Button key={item.title} href={item.href} component={Link}>
                      {item.title}
                    </Button>
                  );
                })}
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
                <ListItemButton component={Link} href={href}>
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
