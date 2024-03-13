import { Box, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { blue } from "@mui/material/colors";

export default function ReduxCloneExplanation() {
  return (
    <>
      <Typography component="h1" variant="h3" marginBottom={2}>
        Redux Clone
      </Typography>
      <Box marginBottom={2}>
        <Typography variant="h5" marginBottom={0.5}>
          Note
        </Typography>
        <Typography
          marginLeft={3}
          sx={{
            backgroundColor: blue[50],
            borderRadius: 4,
            padding: 1,
            display: "inline-block",
          }}>
          This is the only page in my app that is{" "}
          <Box component="strong" fontWeight="fontWeightMedium">
            not responsive.
          </Box>{" "}
          It is just a demo.
        </Typography>
      </Box>
      <Box marginBottom={2}>
        <Typography component="h2" variant="h5" marginBottom={0.5}>
          Introduction
        </Typography>
        <Typography marginLeft={3}>
          This program tries to replicate the functionality of Redux. It
          combines the observer pattern with useState.
        </Typography>
      </Box>
      <Box marginBottom={2}>
        <Typography component="h2" variant="h5" marginBottom={0.5}>
          Features
        </Typography>
        <List sx={{ py: 0 }}>
          <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
            <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
              <CircleIcon sx={{ fontSize: "6px" }} />
            </ListItemIcon>
            <Typography component="span">
              Works with Next.js with no wrapper and and no prop drilling
            </Typography>
          </ListItem>
          <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
            <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
              <CircleIcon sx={{ fontSize: "6px" }} />
            </ListItemIcon>
            <Typography component="span">
              Stores, slices, selectors, and event emitters
            </Typography>
          </ListItem>
          <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
            <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
              <CircleIcon sx={{ fontSize: "6px" }} />
            </ListItemIcon>
            <Typography component="span">
              Equality functions to prevent unnecessary renders
            </Typography>
          </ListItem>

          <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
            <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
              <CircleIcon sx={{ fontSize: "6px" }} />
            </ListItemIcon>
            <Typography component="span">
              Components subscribe to events/state updates and decide if they
              want to render based on the information they receive
            </Typography>
          </ListItem>
          <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
            <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
              <CircleIcon sx={{ fontSize: "6px" }} />
            </ListItemIcon>
            <Typography component="span">
              Store is available in React DevTools
            </Typography>
          </ListItem>
        </List>
      </Box>
      <Box marginBottom={2}>
        <Typography component="h2" variant="h5" marginBottom={0.5}>
          Demo Information
        </Typography>
        <List sx={{ py: 0 }}>
          <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
            <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
              <CircleIcon sx={{ fontSize: "6px" }} />
            </ListItemIcon>
            <Typography component="span">
              The above features are shown in this demo
            </Typography>
          </ListItem>
          <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
            <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
              <CircleIcon sx={{ fontSize: "6px" }} />
            </ListItemIcon>
            <Typography component="span">
              Mock HTTP calls (using Promises){" "}
              <Box component="strong" fontWeight="fontWeightMedium">
                in server components
              </Box>{" "}
              populate the state in
              <Box
                component="strong"
                fontWeight="fontWeightMedium"
                paddingX={0.5}>
                ciient components
              </Box>
            </Typography>
          </ListItem>
        </List>
      </Box>
      <Box marginBottom={2}>
        <Typography component="h2" variant="h5" marginBottom={0.5}>
          How to use
        </Typography>
        <List sx={{ py: 0 }}>
          <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
            <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
              <CircleIcon sx={{ fontSize: "6px" }} />
            </ListItemIcon>
            <Typography component="span">
              The store in in react DevTools and is called StoreClientWrapper
            </Typography>
          </ListItem>
          <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
            <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
              <CircleIcon sx={{ fontSize: "6px" }} />
            </ListItemIcon>
            <Typography component="span">
              Subscribe and unsubscribe from events and emit the events (see
              Component Tree 4).
            </Typography>
          </ListItem>
          <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
            <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
              <CircleIcon sx={{ fontSize: "6px" }} />
            </ListItemIcon>
            <Typography component="span" fontWeight={"medium"}>
              Check the DevTools console to see the results
            </Typography>
          </ListItem>
          <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
            <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
              <CircleIcon sx={{ fontSize: "6px" }} />
            </ListItemIcon>
            <Typography component="span">
              Add books, games, etc and then navigate away from the page. When
              you navigate back the data should still be on the page
            </Typography>
          </ListItem>
          <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
            <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
              <CircleIcon sx={{ fontSize: "6px" }} />
            </ListItemIcon>
            <Typography component="span">
              Hard refreshes delete the data as it is not stored in any database
            </Typography>
          </ListItem>
        </List>
      </Box>
    </>
  );
}
