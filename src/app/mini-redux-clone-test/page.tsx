import EmitWithSubscriberService from "@/services/EmitWithSubscriberService";
import SliceFetcher from "@/services/SliceFetcher";
import StoreClientWrapper from "@/services/StoreClientWrapper";
import SubscriberWithHooks from "@/services/SubscriberWithHooks";
import SubscriberWithoutHooks from "@/services/SubscriberWithOutHooks";
import SliceFetcherWrapper from "@/services/SliceFetcherWrapper";
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
        <Box marginTop={4} marginBottom={4}></Box>
        <SliceFetcherWrapper />
        <Box
          sx={{
            marginY: 3,
          }}></Box>
        <EmitWithSubscriberService />
      </Box>
    </StoreClientWrapper>
  );
}
