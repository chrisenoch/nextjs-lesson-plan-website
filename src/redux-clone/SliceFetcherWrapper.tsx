"use client"; //This must be "use client" or the data fetched does not show in the client component SliceSubsciber, which is returned
//by SliceFetcher.

import SliceFetcher from "@/redux-clone/SliceFetcher";

export default function SliceFetcherWrapper() {
  return <SliceFetcher />;
}
