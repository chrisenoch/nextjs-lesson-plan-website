import EmitWithSubscriberService from "@/services/EmitWithSubscriberService";
import SliceFetcher from "@/services/SliceFetcher";
import StoreClientWrapper from "@/services/StoreClientWrapper";
import SubscriberWithHooks from "@/services/SubscriberWithHooks";
import SubscriberWithoutHooks from "@/services/SubscriberWithOutHooks";
import SliceFetcherWrapper from "@/services/SliceFetcherWrapper";

export default function MiniReduxClonePage() {
  console.log("MiniReduxClonePage rendered");
  return (
    <>
      <StoreClientWrapper>
        <SubscriberWithHooks />
        <SubscriberWithoutHooks />
        <br />
        <SliceFetcherWrapper />
        <EmitWithSubscriberService />
      </StoreClientWrapper>
    </>
  );
}
