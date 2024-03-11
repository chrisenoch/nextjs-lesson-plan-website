"use client";

import { useState } from "react";

export default function useHasPropChanged(prop: any) {
  const [previousProp, setPreviousProp] = useState<any>(prop);

  if (prop !== previousProp) {
    setPreviousProp(prop);
    return true;
  } else {
    return false;
  }
}
