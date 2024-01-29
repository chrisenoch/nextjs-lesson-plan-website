"use client";

import {
  AppBar,
  Toolbar,
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
  useScrollTrigger,
  Link,
  Icon,
  SvgIconTypeMap,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, selectLoginStatus, userLogout } from "@/store";
import SecureNextLink from "../Utils/SecureNextLink";
import InSecureNextLink from "next/link";
import { LoginStatus } from "@/models/types/Auth/LoginStatus";
import MenuButton from "../MenuButton";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CloseIcon from "@mui/icons-material/Close";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export default function ResponsiveAppBar({
  drawerWidth,
  burgerTopLinks,
  navBarItems,
}: {
  drawerWidth: number;
  burgerTopLinks: {
    text: string;
    href: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    };
  }[];
  navBarItems: { title: string; href: string }[];
}) {
  console.log("Responsive AppBar mounts");
  const loginStatus: LoginStatus = useSelector(selectLoginStatus);
  const dispatch = useDispatch<AppDispatch>();

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
            backgroundColor: "background.paper",
            boxShadow: "0 1px #0000001f",
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
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                fontSize: "h6.fontSize",
              }}>
              <Link
                href="/"
                underline="none"
                component={SecureNextLink}
                sx={{ fontWeight: "medium" }}>
                Lesson planz
              </Link>
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
              }}>
              <MenuButton
                id="lesson-plans-nav-button"
                buttonComponent={<Button size="large">Lesson Plans</Button>}
                menuItems={[
                  { name: "All Lesson Plans", href: "/lessonplans" },
                  { name: "Saved", href: "/lessonplans/saved" },
                ]}
              />
              {navBarItems.map((item) => {
                return (
                  <Button
                    key={item.title}
                    href={item.href}
                    component={SecureNextLink}
                    size="large">
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
                  }}
                  size="large">
                  Logout
                </Button>
              )}
              {loginStatus === "LOGGED_OUT" && (
                <Button
                  key="Login"
                  href={"/auth/signin"}
                  component={InSecureNextLink}
                  size="large">
                  {/* We don't need to check the login route in middleware */}
                  Login
                </Button>
              )}
              {loginStatus === "LOGIN_NOT_PROCESSED" && (
                <LoadingButton
                  key={"loading-placeholder"}
                  loading
                  disabled
                  variant="outlined"
                  size="large">
                  {/* value here affects the button size */}
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
              width: drawerWidth,
              maxHeight: "100vh",
            },
          }}>
          <Divider />
          <List>
            <ListItem
              disablePadding
              // sx={{
              //   minWidth: "fit-content",
              //   marginLeft: "auto",
              // }}
            >
              <ListItemButton onClick={() => setMobileOpen(false)}>
                <ListItemIcon
                  sx={{
                    minWidth: "fit-content",
                    marginLeft: "auto",
                  }}>
                  <CloseIcon />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            {burgerTopLinks.map(({ text, href, icon: Icon }) => (
              <ListItem
                key={href}
                disablePadding
                onClick={() => setMobileOpen(false)}>
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
            {loginStatus === "LOGGED_IN" && (
              <ListItem
                key="Logout"
                disablePadding
                onClick={() => setMobileOpen(false)}>
                <ListItemButton
                  onClick={() => {
                    dispatch(userLogout());
                  }}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            )}
            {loginStatus === "LOGGED_OUT" && (
              <ListItem
                key="Login"
                disablePadding
                onClick={() => setMobileOpen(false)}>
                <ListItemButton
                  component={SecureNextLink}
                  href={"/auth/signin"}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Drawer>
      </nav>
    </>
  );
}
