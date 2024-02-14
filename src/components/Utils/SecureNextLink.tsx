import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { ReactElement, forwardRef } from "react";
import { useHydrated } from "@/customHooks/useHydrated";

/**
 * @summary SecureNextLink always invokes middleware (according to tests so far). NextLink DOES NOT always invoke middleware due to its soft navigation.
 * Numerous issues have been posted regarding this on StackOverflow, Reddit and GitHub. We use this solution rather than changing the version of Next.js
 * because sometimes Next.js solves bugs in one version and then they reappear in later versions. To ensure a stable application, we solve the issue ourselves.
 * @description When NextLink does not trigger middleware, this is a problem for authentication.
 * Using NextLink leads to issues such as a user logging out and still being able to view authenticated content for a period of time,
 * a user logging in and not having access to the authenticated content immediately (due to NextLink's soft navigation and middleware not being activated),
 * and even the wrong url showing in the navigation bar.
 *
 * The problem with our SecureNextLink approach is that a developer may use NextLink by mistake. However, this is the only approach that ensures middleware
 * is activated every time. NextLink also sometimes skips rendering server components due to its soft navigation. This means that we cannot reliably protect
 * routes in server page components via a HOC either.
 *
 * SecureNextLink works by adding a random id to a query parameter in every request, which pushes NextJS to skip soft navigation and invoke the middleware
 * so we can check for authentication. Then, in the middleware, the query parameter with the random id is deleted and the user is redirected back
 * to the original url (see handleSecureNextLink# in middleware.ts). The user does not see any difference.
 *
 * Limitations: Does not suppport segments. E.g. foo.com/home#title. As segments are not sent to the server.
 */
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

  // Remove fragment if exists. Fragments can't be processed server-side and this
  // function uses NextJs middleware. If we don't remove the fragment, the
  // next-link query parameter will not be read in the middleware.
  let hrefNoFragment = "";
  const index = href.indexOf("#");
  if (index !== -1) {
    hrefNoFragment = href.substring(0, index);
  } else {
    hrefNoFragment = href;
  }

  let finalHref;
  const indexOfQuestionMark = href.indexOf("?");
  if (indexOfQuestionMark !== -1) {
    finalHref = hrefNoFragment + "&next-link=" + uuidv4();
  } else {
    finalHref = hrefNoFragment + "?next-link=" + uuidv4();
  }

  return (
    <Link {...otherProps} ref={ref} href={finalHref}>
      {children}
    </Link>
  );
});

export default SecureNextLink;
