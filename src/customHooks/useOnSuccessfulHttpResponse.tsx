import { useState } from "react";
/**
 * Runs a callback upon a successful http response. Assumes that if isError is false, then the response succeeded.
 *
 * Example use case: Clear form fields upon a successful form submission to the server.
 * @param httpResponseStatus
 * @param callback
 */
export default function useOnSuccessfulHttpResponse(
  httpResponseStatus: null | {
    isError: boolean;
    isLoading: boolean;
  },
  callback: () => void
) {
  const [previousHttpResponseStatus, setPreviousHttpResponseStatus] =
    useState<null | {
      isError: boolean;
      isLoading: boolean;
    }>(httpResponseStatus);

  if (
    httpResponseStatus !== previousHttpResponseStatus &&
    !httpResponseStatus?.isLoading
  ) {
    if (!httpResponseStatus?.isError) {
      callback();
    }
    setPreviousHttpResponseStatus(httpResponseStatus);
  }
}
