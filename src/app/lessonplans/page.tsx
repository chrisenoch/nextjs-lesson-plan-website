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
import StarIcon from "@mui/icons-material/Star";

export default function LessonPlansPage() {
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
              // bgcolor: "background.paper",
              position: "fixed",
            }}
            aria-label="contacts">
            <ListItem disablePadding>
              <ListItemButton>
                {/* <ListItemIcon>
                  <StarIcon />
                </ListItemIcon> */}
                <ListItemText primary="Summary" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Warmer" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Teach Vocabulary" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Vocabulary Exercise" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Teach Speaking Phrases" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Role Play" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary="Feedback"
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: "medium",
                      color: "primary.main",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Plenary" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={8}>
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
