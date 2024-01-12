import { useEffect } from "react";

export default function useTestHookThree() {
  console.log("useTestHook Three renders");

  useEffect(() => {
    console.log("useEffect in useTestHook Three renders");
  }, []);
}
