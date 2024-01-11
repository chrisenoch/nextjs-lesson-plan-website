import { session } from "@/session/session";
import Loading from "./Loading";

export default function withAuth(Component) {
  return function WithAuth(props: any) {
    if (session.isAuthenticated) {
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
