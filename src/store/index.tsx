import { configureStore } from "@reduxjs/toolkit";
import { jobsReducer, addJob, removeJob, fetchJobs } from "./slices/jobs-slice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});

export { store, addJob, removeJob, fetchJobs };
export type AppDispatch = typeof store.dispatch;
