import { useState } from "react";

/**
 * @example
 *  const shouldHideMessage = useHideMessageOnNavAway(addJobHttpResponseStatus);
 * 
 * {!shouldHideMessage && addJobHttpResponseStatus.message && (
            <'component that shows the message'>
    )}
 * @param httpResponseStatus 
 * @returns 
 */
export default function useHideMessageOnNavAway(
  httpResponseStatus: null | {
    message: string;
    isLoading: boolean;
  }
) {
  const [previousHttpResponseStatus] = useState<null | {
    message: string;
    isLoading: boolean;
  }>(httpResponseStatus);

  /*If the http response status has been updated (e.g. due to a response from the server after a form submission) then we do not hide the message.
  If the user navigates away and then later navigates back to the page, initially httpResponseStatus will equal previousHttpResponseStatus 
  and so true will be returned. */
  if (
    httpResponseStatus !== previousHttpResponseStatus &&
    !httpResponseStatus?.isLoading
  ) {
    if (httpResponseStatus?.message) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}
