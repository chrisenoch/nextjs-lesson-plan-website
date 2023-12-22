import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { MutableRefObject, ReactElement, forwardRef, useRef } from "react";
import { useHydrated } from "@/customHooks/useHydrated";

// Summary: SecureNextLink always invokes middleware (according to tests so far). NextLink sometimes skips middleware.

// When NextLink does not trigger middleware, this is a problem because middleware is used for authentication.
// Using NextLink leads to a user logging out and still being able to view authenticated content for a period of time.
// Also, a user may login and not have access to the authenticated content immediately due to NextLink's
// soft navigation and middleware not being activated.

// SecureNextLink adds a random id to every request, which pushes NextJS to invoke the middleware so we can check for authentication.
// Then, in the middleware, the random id suffix is deleted and the user is redirected back to the original id.
// The user does not see any difference.

// The problem with this approach is that a developer may use NextLink by mistake. However, this is the only approach
// that ensures middleware is activated. NextLink also sometimes skips rendering server components due to its soft navigation.
// This means that we cannot reliably protect routes in server page components either.
const SecureNextLink = forwardRef(function Wrapper(props: any, ref: any) {
  const {
    href,
    children,
    ...otherProps
  }: { href: string; children: ReactElement } = props;

  //If not, NextJS will complain that the random id on the server does not match the random id on the client
  const isHydrated = useHydrated();
  if (!isHydrated) {
    return (
      <Link {...otherProps} ref={ref} href={href}>
        {children}
      </Link>
    );
  }

  //deal with query params if they exist
  let urlBeforeSearchParams;
  let searchParams;
  let finalHref;
  const indexOfQuestionMark = href.indexOf("?");
  if (indexOfQuestionMark !== -1) {
    urlBeforeSearchParams = href.substring(0, indexOfQuestionMark);
    searchParams = href.substring(indexOfQuestionMark);
    finalHref =
      urlBeforeSearchParams +
      "/next-link-wrapper-id/" +
      uuidv4() +
      searchParams;
  } else {
    finalHref = href + "/next-link-wrapper-id/" + uuidv4();
  }

  return (
    <Link {...otherProps} ref={ref} href={finalHref}>
      {children}
    </Link>
  );
});

export default SecureNextLink;
