import EmitWithSubscriberService from "@/services/EmitWithSubscriberService";
import SliceFetcher from "@/services/SliceFetcher";
import StoreClientWrapper from "@/services/StoreClientWrapper";
import SubscriberWithHooks from "@/services/SubscriberWithHooks";
import SubscriberWithoutHooks from "@/services/SubscriberWithOutHooks";
import SliceFetcherWrapper from "@/services/SliceFetcherWrapper";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CurvedUnderlineTitle from "@/components/presentation-c/CurvedUnderline";
import NotificationBox from "@/components/NotificationBox";
import CircleIcon from "@mui/icons-material/Circle";

export default function MiniReduxClonePage() {
  console.log("MiniReduxClonePage rendered");
  return (
    <>
      <StoreClientWrapper>
        <Box
          sx={{
            // display: "flsex",
            maxWidth: "1200px",
            margin: "0 auto",
            // justifyContent: "censter",
            width: "100%",
          }}>
          <CurvedUnderlineTitle
            component={"h1"}
            variant={"h3"}
            title={"Redux Clone"}
            color={"primary.main"}
            sxUnderline={{ left: 2, borderRadius: "30%" }}
            sxTypography={{
              marginBottom: "12px !important",
              alignSelf: "center",
            }}
          />
          <NotificationBox
            message={
              "This is the only page in my app that is not styled or responsive"
            }
            sxOuterContainer={{
              marginTop: 2,
            }}
            variant={"info"}
          />
          <Typography variant="h5">This demo shows the use of:</Typography>
          <List>
            <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
              <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
                <CircleIcon sx={{ fontSize: "6px" }} />
              </ListItemIcon>
              <Typography component="span">
                Subscribing to events and emitting events
              </Typography>
            </ListItem>
            <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
              <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
                <CircleIcon sx={{ fontSize: "6px" }} />
              </ListItemIcon>
              <Typography component="span">
                A single source of state (search for StoreClientWrapper in React
                DevTools)
              </Typography>
            </ListItem>
            <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
              <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
                <CircleIcon sx={{ fontSize: "6px" }} />
              </ListItemIcon>
              <Typography component="span">
                Mock HTTP calls (using Promises){" "}
                <Box
                  component="strong"
                  fontWeight="fontWeightMedium"
                  paddingX={0.5}>
                  in server components
                </Box>
                , to fetch the books, games and top players and to
                <Box
                  component="strong"
                  fontWeight="fontWeightMedium"
                  paddingX={0.5}>
                  populate the store in ciient components
                </Box>
              </Typography>
            </ListItem>
            <ListItem sx={{ paddingBottom: 0, paddingTop: 0.5 }}>
              <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
                <CircleIcon sx={{ fontSize: "6px" }} />
              </ListItemIcon>
              <Typography component="span">
                No complicated wrapper or prop-drilling needed to hydrate the
                store (see the source code).
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
                Equality functions to prevent unnecessary renders
              </Typography>
            </ListItem>
          </List>
          <Typography variant="body1" color="initial">
            How to use
          </Typography>
          <Typography variant="body1" color="initial">
            Subscribe and unsubscribe and emit events. See the console for the
            results. If naviate away from page, data still persists. Hard
            refresh lose all
          </Typography>
          <Box
            sx={{
              marginY: 3,
            }}></Box>
          <SubscriberWithHooks />
          <Box
            sx={{
              marginY: 3,
            }}></Box>
          <SubscriberWithoutHooks />
          <br />
          <SliceFetcherWrapper />
          <Box
            sx={{
              marginY: 3,
            }}></Box>
          <EmitWithSubscriberService />
        </Box>
      </StoreClientWrapper>
    </>
  );
}
