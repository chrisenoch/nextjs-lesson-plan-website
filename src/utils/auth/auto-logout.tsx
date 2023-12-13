import { AppDispatch } from "@/store";
import { userLogout } from "@/store/slices/with-thunks/auth-thunks";
import { useSelector, useDispatch } from "react-redux";

const { userInfo } = useSelector((state) => state.auth);
const dispatch = useDispatch<AppDispatch>();

export function autoLogout() {
  //1_800_000ms = 30 mins
  const intervalId = setInterval(() => {
    if (userInfo.isLoggedIn) {
      const tokenExpiry = new Date(userInfo.exp);

      //get the date 30 minutes from nowc
      const thirtyMinsInFuture = Date.now() + 1_800_000;

      //check if token will expire in the next 30 minutes
      if (thirtyMinsInFuture > tokenExpiry.valueOf()) {
        const timeoutId = setTimeout(() => {
          dispatch(userLogout());
        }, tokenExpiry.valueOf() - Date.now());
      }
    }
  }, 1_800_000);
}
