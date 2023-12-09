import { configureStore } from "@reduxjs/toolkit";
import { jobsReducer, addJob, removeJob, fetchJobs } from "./slices/jobs-slice";
import { apiSlice } from "./slices/with-rtk-query/api/api-slice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export { store, addJob, removeJob, fetchJobs };
export type AppDispatch = typeof store.dispatch;
