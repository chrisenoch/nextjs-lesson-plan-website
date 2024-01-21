import { useState } from "react";

export default function useTriggerRerender() {
  const [count, setCount] = useState(0);

  function triggerRerender() {
    setCount((c) => c + 1);
  }

  return {
    triggerRerender,
    rerenderCount: count,
  };
}
