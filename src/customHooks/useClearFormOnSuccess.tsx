import { useState } from "react";

export default function useClearFormOnSuccess(
  formInfo: null | {
    isError: boolean;
    isLoading: boolean;
  },
  clearFormCallback: () => void
) {
  const [previousFormInfo, setPreviousFormInfo] = useState<null | {
    isError: boolean;
    isLoading: boolean;
  }>(formInfo);

  if (formInfo !== previousFormInfo && !formInfo?.isLoading) {
    if (!formInfo?.isError) {
      clearFormCallback();
    }
    setPreviousFormInfo(formInfo);
  }
}
