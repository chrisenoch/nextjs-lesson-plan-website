import EmitWithSubscriberService from "@/redux-clone/EmitWithSubscriberService";
import SliceFetcher from "@/redux-clone/SliceFetcher";
import StoreClientWrapper from "@/redux-clone/StoreClientWrapper";
import SubscriberWithHooks from "@/redux-clone/SubscriberWithHooks";
import SubscriberWithoutHooks from "@/redux-clone/SubscriberWithOutHooks";
import SliceFetcherWrapper from "@/redux-clone/SliceFetcherWrapper";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import ReduxCloneExplanation from "@/components/blog -c/ReduxCloneExplanation";

export default function MiniReduxClonePage() {
  console.log("MiniReduxClonePage rendered");
  return (
    <StoreClientWrapper>
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}>
        <ReduxCloneExplanation />
        <Divider
          sx={{
            marginY: 3,
          }}></Divider>
        <Box></Box>
        <SubscriberWithHooks />
        <Box marginTop={4} marginBottom={4}></Box>
        <SubscriberWithoutHooks />
        <Divider
          sx={{
            marginY: 3,
          }}></Divider>
        <Box marginTop={4} marginBottom={4}></Box>
        <EmitWithSubscriberService />
        <Divider
          sx={{
            marginY: 4,
          }}></Divider>
        <Box
          sx={{
            marginY: 4,
          }}></Box>

        <SliceFetcherWrapper />
      </Box>
    </StoreClientWrapper>
  );
}
