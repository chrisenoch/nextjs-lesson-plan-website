import { useState } from "react";

export default function useEventEmitter() {
  const [dispatcher] = useState<any>({});

  return dispatcher;
}
