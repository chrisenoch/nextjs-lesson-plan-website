import { useState } from "react";

export default function useDeleteErrorOnNavAway(
  formInfo: null | {
    isError: boolean;
    isLoading: boolean;
  }
) {
  const [previousFormInfo, setPreviousFormInfo] = useState<null | {
    isError: boolean;
    isLoading: boolean;
  }>(formInfo);

  //if forminfoWasDefined, check error status and return error if is the case
  // if (formInfo?.isError) {
  //   return true;
  // }

  if (formInfo !== previousFormInfo && !formInfo?.isLoading) {
    console.log("in if");
    if (formInfo?.isError) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }

  // if (formInfo !== previousFormInfo && !formInfo?.isLoading) {
  //   setPreviousFormInfo(formInfo);
  //   return false;
  // } else if (formInfo !== previousFormInfo && !formInfo?.isLoading) {
  // }
}
