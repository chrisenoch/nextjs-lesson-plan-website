import { AppDispatch, getAccessTokenWithRefreshToken } from "@/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function useTestHook() {
  console.log("useTestHook renders");
  //does not re-render hok nor calling component
  // const bar = useRef<number>(0);
  // console.log("value of bar: " + bar);
  // setTimeout(() => {
  //   bar.current = bar.current + 1;
  // }, 1000);

  // re-renders hook and calling component
  //   const [foo, setFoo] = useState<number>(0);
  //   console.log("value of foo: " + foo);
  //   setTimeout(() => {
  //     setFoo((c) => c + 1);
  //   }, 1000);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const id = setInterval(() => {
      console.log("dispatching getAccessTokenWithRefreshToken");
      dispatch(getAccessTokenWithRefreshToken());
    }, 2000);

    return () => clearInterval(id);
  }, [dispatch]);
}
