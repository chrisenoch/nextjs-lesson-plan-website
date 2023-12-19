import HomePage from "@/app/page";
import { redirect } from "next/navigation";
import { SignIn } from "./SignIn";
import Loading from "./Loading";

export default function withAuth(Component) {
  return function WithAuth(props: any) {
    const isLoggedIn = false;
    let hideComponent = true;

    if (isLoggedIn) {
      //redirect("/");
      //return null;
      return <Component {...props} />;
    } else {
      return <Loading redirectTo="/auth/signin" />;
    }

    // if (!isLoggedIn) {
    //   return null;
    // }

    return <Component {...props} />;
  };
}
