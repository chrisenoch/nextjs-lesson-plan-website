import { useState } from "react";

export default function useHideMessageOnNavAway(
  formInfo: null | {
    message: string;
    isLoading: boolean;
  }
) {
  const [previousFormInfo, setPreviousFormInfo] = useState<null | {
    message: string;
    isLoading: boolean;
  }>(formInfo);

  if (formInfo !== previousFormInfo && !formInfo?.isLoading) {
    if (formInfo?.message) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}
