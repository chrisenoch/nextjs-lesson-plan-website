import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { ReactElement, forwardRef } from "react";
import { useHydrated } from "@/customHooks/useHydrated";

const NextLinkWrapper = forwardRef(function Wrapper(props: any, ref: any) {
  const { href, children, ...otherProps } = props;
  const isHydrated = useHydrated();

  if (!isHydrated) {
    //return <Link href={href}>{label}</Link>;
    return (
      <Link {...otherProps} ref={ref} href={href}>
        {children}
      </Link>
    );
  }

  const finalHref = href + "/remove-me/" + uuidv4();
  //return <Link href={finalHref}>{label}</Link>;
  return (
    <Link {...otherProps} ref={ref} href={finalHref}>
      {children}
    </Link>
  );
});

export default NextLinkWrapper;
