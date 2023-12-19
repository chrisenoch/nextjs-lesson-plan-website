import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { MutableRefObject, ReactElement, forwardRef, useRef } from "react";
import { useHydrated } from "@/customHooks/useHydrated";

const NextLinkWrapper = forwardRef(function Wrapper(props: any, ref: any) {
  const {
    href,
    children,
    ...otherProps
  }: { href: string; children: ReactElement } = props;

  const isHydrated = useHydrated();
  if (!isHydrated) {
    return (
      <Link {...otherProps} ref={ref} href={href}>
        {children}
      </Link>
    );
  }

  const finalHref = href + "/next-link-wrapper-id/" + uuidv4();
  return (
    <Link {...otherProps} ref={ref} href={finalHref}>
      {children}
    </Link>
  );
});

export default NextLinkWrapper;
