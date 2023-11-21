//To DO: remove this and pass down props to client component
"use client";

import useIntersectionObserver from "@/customHooks/useIntersectionObserver";
import {
  Grid,
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

export default function LessonPlansPage() {
  const isSummaryIntersecting = useIntersectionObserver("#summary");
  const isWarmerIntersecting = useIntersectionObserver("#warmer");
  const isTeachVocabIntersecting = useIntersectionObserver("#teach-vocabulary");
  const isVocabExercisesIntersecting = useIntersectionObserver(
    "#vocabulary-exercise"
  );
  const isSpeakingPhrasesIntersecting = useIntersectionObserver(
    "#teach-speaking-phrases"
  );
  const isRolePlayIntersecting = useIntersectionObserver("#role-play");
  const isFeedbackIntersecting = useIntersectionObserver("#feedback");
  const isPlenaryIntersecting = useIntersectionObserver("#plenary");

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
              <ListItemButton>
                {/* <ListItemIcon>
                  <StarIcon />
                </ListItemIcon> */}
                <ListItemText
                  primary="Summary"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: isSummaryIntersecting ? "bold" : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary="Warmer"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: isWarmerIntersecting ? "bold" : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary="Teach Vocabulary"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: isTeachVocabIntersecting ? "bold" : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary="Vocabulary Exercise"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: isVocabExercisesIntersecting
                        ? "bold"
                        : "normal",
                      color: isVocabExercisesIntersecting
                        ? "secondary.main"
                        : "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary="Teach Speaking Phrases"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: isSpeakingPhrasesIntersecting
                        ? "bold"
                        : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary="Role Play"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: isRolePlayIntersecting ? "bold" : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary="Feedback"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: isFeedbackIntersecting ? "bold" : "normal",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary="Plenary"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: isPlenaryIntersecting ? "bold" : "normal",
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
          <Typography id="summary" gutterBottom variant="h3">
            Summary
          </Typography>
          <Typography variant="body1" marginBottom={4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            veritatis asperiores provident corrupti optio odit quo quos! Quam
            vel accusantium, earum, maiores molestiae quasi sed nesciunt nisi,
            ipsa recusandae neque.
          </Typography>
          <Typography id="warmer" gutterBottom variant="h3">
            Warmer
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
          <Typography id="teach-vocabulary" gutterBottom variant="h3">
            Teach Vocabulary
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
          <Typography id="vocabulary-exercise" gutterBottom variant="h3">
            Vocabulary exercise
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
          <Typography id="teach-speaking-phrases" gutterBottom variant="h3">
            Teach speaking phrases
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
          <Typography id="role-play" gutterBottom variant="h3">
            Role play
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
          <Typography id="feedback" gutterBottom variant="h3">
            Feedback
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
          <Typography id="plenary" gutterBottom variant="h3">
            Plenary
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
