"use client";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import useScrollSpy from "@/customHooks/useScrollSpy";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import FloatingId from "@/components/FloatingId";
import useRedirectWhenLoggedOut from "@/customHooks/useRedirectWhenLoggedOut";

export default function LessonPlansPage() {
  console.log("LessonPlansPageContent rendered");
  useRedirectWhenLoggedOut("/auth/signin");

  let activeIntersection = useScrollSpy([
    "summary",
    "warmer",
    "teach-vocabulary",
    "vocabulary-exercise",
    "teach-speaking-phrases",
    "role-play",
    "feedback",
    "plenary",
  ]);

  return (
    <Stack
      direction="row"
      maxWidth={"1200px"}
      mx={"auto"}
      marginTop={2}
      marginBottom={2}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "fixed",
            }}
            aria-label="summary">
            <ListItem disablePadding>
              <ListItemButton component="a" href="#summary-floating">
                {/* <ListItemIcon>
                  <StarIcon />
                </ListItemIcon> */}
                <ListItemText
                  primary="Summary"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight:
                        activeIntersection === "summary" ? "bold" : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#warmer-floating">
                <ListItemText
                  primary="Warmer"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight:
                        activeIntersection === "warmer" ? "bold" : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#teach-vocabulary-floating">
                <ListItemText
                  primary="Teach Vocabulary"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight:
                        activeIntersection === "teach-vocabulary"
                          ? "bold"
                          : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="#vocabulary-exercise-floating">
                <ListItemText
                  primary="Vocabulary Exercise"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight:
                        activeIntersection === "vocabulary-exercise"
                          ? "bold"
                          : "normal",

                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="#teach-speaking-phrases-floating">
                <ListItemText
                  primary="Teach Speaking Phrases"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight:
                        activeIntersection === "teach-speaking-phrases"
                          ? "bold"
                          : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#role-play-floating">
                <ListItemText
                  primary="Role Play"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight:
                        activeIntersection === "role-play" ? "bold" : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#feedback-floating">
                <ListItemText
                  primary="Feedback"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight:
                        activeIntersection === "feedback" ? "bold" : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component="a"
                href="#plenary"
                onClick={() => (activeIntersection = "plenary-floating")}>
                <ListItemText
                  primary="Plenary"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight:
                        activeIntersection === "plenary" ? "bold" : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={8} bgcolor={"background.paper"} marginTop={4}>
          <Typography
            gutterBottom
            variant="h2"
            component={"h1"}
            marginBottom={4}>
            Driverless Cars
          </Typography>
          <Typography
            id="summary"
            gutterBottom
            variant="h4"
            component="h2"
            position="relative">
            Summary
            <FloatingId id="summary-floating" />
          </Typography>
          <Typography variant="body1" marginBottom={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            veritatis asperiores provident corrupti optio odit quo quos! Quam
            vel accusantium, earum, maiores molestiae quasi sed nesciunt nisi,
            ipsa recusandae neque.
          </Typography>
          <Typography
            id="warmer"
            gutterBottom
            variant="h4"
            component="h2"
            position="relative">
            Warmer
            <FloatingId id="warmer-floating" />
          </Typography>
          <Typography variant="body1" marginBottom={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            veritatis asperiores provident corrupti optio odit quo quos! Quam
            vel accusantium, earum, maiores molestiae quasi sed nesciunt nisi,
            ipsa recusandae neque. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Dolore commodi, consequatur eius adipisci mollitia
            cumque placeat amet voluptatum molestias iste! Optio nihil, ratione
            aspernatur reiciendis neque doloremque accusamus repellat quidem?
          </Typography>
          <Typography
            id="teach-vocabulary"
            gutterBottom
            variant="h4"
            component="h2"
            position="relative">
            Teach Vocabulary
            <FloatingId id="teach-vocabulary-floating" />
          </Typography>
          <Typography variant="body1" marginBottom={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            veritatis asperiores provident corrupti optio odit quo quos! Quam
            vel accusantium, earum, maiores molestiae quasi sed nesciunt nisi,
            ipsa recusandae neque. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Dolore commodi, consequatur eius adipisci mollitia
            cumque placeat amet voluptatum molestias iste! Optio nihil, ratione
            aspernatur reiciendis neque doloremque accusamus repellat quidem?
          </Typography>
          <Typography
            id="vocabulary-exercise"
            gutterBottom
            variant="h4"
            component="h2"
            position="relative">
            Vocabulary exercise
            <FloatingId id="vocabulary-exercise-floating" />
          </Typography>
          <Typography variant="body1" marginBottom={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            veritatis asperiores provident corrupti optio odit quo quos! Quam
            vel accusantium, earum, maiores molestiae quasi sed nesciunt nisi,
            ipsa recusandae neque. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Dolore commodi, consequatur eius adipisci mollitia
            cumque placeat amet voluptatum molestias iste! Optio nihil, ratione
            aspernatur reiciendis neque doloremque accusamus repellat quidem?
          </Typography>
          <Typography
            id="teach-speaking-phrases"
            gutterBottom
            variant="h4"
            component="h2"
            position="relative">
            Teach speaking phrases
            <FloatingId id="teach-speaking-phrases-floating" />
          </Typography>
          <Typography variant="body1" marginBottom={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            veritatis asperiores provident corrupti optio odit quo quos! Quam
            vel accusantium, earum, maiores molestiae quasi sed nesciunt nisi,
            ipsa recusandae neque. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Dolore commodi, consequatur eius adipisci mollitia
            cumque placeat amet voluptatum molestias iste! Optio nihil, ratione
            aspernatur reiciendis neque doloremque accusamus repellat quidem?
          </Typography>
          <Typography
            id="role-play"
            gutterBottom
            variant="h4"
            component="h2"
            position="relative">
            Role play
            <FloatingId id="role-play-floating" />
          </Typography>
          <Typography variant="body1" marginBottom={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            veritatis asperiores provident corrupti optio odit quo quos! Quam
            vel accusantium, earum, maiores molestiae quasi sed nesciunt nisi,
            ipsa recusandae neque. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Dolore commodi, consequatur eius adipisci mollitia
            cumque placeat amet voluptatum molestias iste! Optio nihil, ratione
            aspernatur reiciendis neque doloremque accusamus repellat quidem?
          </Typography>
          <Typography
            id="feedback"
            gutterBottom
            variant="h4"
            component="h2"
            position="relative">
            Feedback
            <FloatingId id="feedback-floating" />
          </Typography>
          <Typography variant="body1" marginBottom={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            veritatis asperiores provident corrupti optio odit quo quos! Quam
            vel accusantium, earum, maiores molestiae quasi sed nesciunt nisi,
            ipsa recusandae neque. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Dolore commodi, consequatur eius adipisci mollitia
            cumque placeat amet voluptatum molestias iste! Optio nihil, ratione
            aspernatur reiciendis neque doloremque accusamus repellat quidem?
          </Typography>
          <Typography
            id="plenary"
            gutterBottom
            variant="h4"
            component="h2"
            position="relative">
            Plenary
            <FloatingId id="plenary-floating" />
          </Typography>
          <Typography variant="body1" marginBottom={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            veritatis asperiores provident corrupti optio odit quo quos! Quam
            vel accusantium, earum, maiores molestiae quasi sed nesciunt nisi,
            ipsa recusandae neque. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Dolore commodi, consequatur eius adipisci mollitia
            cumque placeat amet voluptatum molestias iste! Optio nihil, ratione
            aspernatur reiciendis neque doloremque accusamus repellat quidem?
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
