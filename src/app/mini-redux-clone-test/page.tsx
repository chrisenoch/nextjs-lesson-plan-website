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
          <Typography variant="body1" color="initial">
            This demo shows the use of:
          </Typography>
          <List>
            <ListItem>Subscribing to events and emitting events</ListItem>
            <ListItem>
              A single source of state (search for StoreClientWrapper in React
              DevTools)
            </ListItem>
            <ListItem>
              Mock HTTP calls (using Promises), to pre-fetch the books, games
              and top players and to
              <Box component="span" fontWeight="fontWeightMedium">
                populate the store
              </Box>
            </ListItem>
            <ListItem>
              No wrapper or prop-drilling needed (see the source code).
            </ListItem>
            <ListItem>
              Components subscribe to events/state updates and decide if they
              want to render based on the information they receive.
            </ListItem>
            <ListItem>
              <ListItemIcon sx={{ minWidth: "fit-content", paddingRight: 1 }}>
                <CircleIcon sx={{ fontSize: "6px" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ fontSize: "16px !important" }}
                primary="Equality functions to prevent unnecessary renders."
              />
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
          <SubscriberWithHooks />
          <SubscriberWithoutHooks />
          <br />
          <SliceFetcherWrapper />
          <EmitWithSubscriberService />
        </Box>
      </StoreClientWrapper>
    </>
  );
}
