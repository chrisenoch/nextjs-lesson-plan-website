import { configureStore } from "@reduxjs/toolkit";
import { jobsReducer, addJob, removeJob } from "./slices/jobs-slice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
});

export { store, addJob, removeJob };
