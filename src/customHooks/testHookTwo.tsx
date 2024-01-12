import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useTestHookTwo() {
  console.log("useTestHook Two renders");
  const { wasLastRefreshSuccessful } = useSelector((state) => state.authSlice);

  console.log("waslastrefreshSuccessful: " + wasLastRefreshSuccessful);

  useEffect(() => {
    console.log("useeffect runnign for 'first' time");
  }, []);

  //Insightful
  //   console.log("useTestHook Two renders");
  //   const { userInfo, wasLastRefreshSuccessful } = useSelector(
  //     (state) => state.authSlice
  //   );

  //   useEffect(() => {
  //     console.log(userInfo);
  //     console.log("userInfo updated in useTestHookTwo");
  //   }, [userInfo]);

  //   useEffect(() => {
  //     console.log(wasLastRefreshSuccessful);
  //     console.log("wasLastRefreshSuccessful updated in useTestHookTwo");
  //   }, [wasLastRefreshSuccessful]);
}
