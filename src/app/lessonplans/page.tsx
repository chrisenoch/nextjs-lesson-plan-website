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
  const intersectorStatus: { [key: string]: boolean } = {};

  intersectorStatus.isSummaryIntersecting = useIntersectionObserver("#summary");
  intersectorStatus.isWarmerIntersecting = useIntersectionObserver("#warmer");
  intersectorStatus.isTeachVocabIntersecting =
    useIntersectionObserver("#teach-vocabulary");
  intersectorStatus.isVocabExercisesIntersecting = useIntersectionObserver(
    "#vocabulary-exercise"
  );
  intersectorStatus.isSpeakingPhrasesIntersecting = useIntersectionObserver(
    "#teach-speaking-phrases"
  );
  intersectorStatus.isRolePlayIntersecting =
    useIntersectionObserver("#role-play");
  intersectorStatus.isFeedbackIntersecting =
    useIntersectionObserver("#feedback");
  intersectorStatus.isPlenaryIntersecting = useIntersectionObserver("#plenary");

  ensureOnlyOneLinkIsActive(intersectorStatus);

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
                      fontWeight: intersectorStatus.isSummaryIntersecting
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
                  primary="Warmer"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: intersectorStatus.isWarmerIntersecting
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
                  primary="Teach Vocabulary"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: intersectorStatus.isTeachVocabIntersecting
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
                  primary="Vocabulary Exercise"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: intersectorStatus.isVocabExercisesIntersecting
                        ? "bold"
                        : "normal",
                      color: intersectorStatus.isVocabExercisesIntersecting
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
                      fontWeight:
                        intersectorStatus.isSpeakingPhrasesIntersecting
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
                      fontWeight: intersectorStatus.isRolePlayIntersecting
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
                  primary="Feedback"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: intersectorStatus.isFeedbackIntersecting
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
                  primary="Plenary"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: intersectorStatus.isPlenaryIntersecting
                        ? "bold"
                        : "normal",
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
function ensureOnlyOneLinkIsActive(intersectorStatus: {
  [key: string]: boolean;
}) {
  let activeIntersectors: string[] = [];
  Object.entries(intersectorStatus).forEach(([intersectorName, isActive]) => {
    if (isActive) {
      activeIntersectors.push(intersectorName);
    }
  });

  if (activeIntersectors.length > 1) {
    activeIntersectors.pop(); //we keep the last active intersector active

    //make the others inactive
    activeIntersectors.forEach((intersector) => {
      intersectorStatus[intersector] = false;
    });
  }
}
