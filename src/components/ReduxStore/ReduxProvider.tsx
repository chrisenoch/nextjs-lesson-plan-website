"use client";
import * as React from "react";
import { fetchJobs, store } from "../../store";
import { Provider } from "react-redux";

store.dispatch(fetchJobs());
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
