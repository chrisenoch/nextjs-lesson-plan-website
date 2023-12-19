import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { ReactElement } from "react";
import { useHydrated } from "@/customHooks/useHydrated";

export default function NextLinkWrapper({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return <Link href={href}>{label}</Link>;
  }

  const finalHref = href + "/remove-me/" + uuidv4();
  return <Link href={finalHref}>{label}</Link>;
}
