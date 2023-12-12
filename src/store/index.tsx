import { configureStore } from "@reduxjs/toolkit";
import {
  jobsReducer,
  addJob,
  removeJob,
  fetchJobs,
} from "./slices/with-thunks/jobs-slice";
import { authReducer } from "./slices/with-thunks/auth-slice";
import { userLogin, registerUser } from "./slices/with-thunks/auth-thunks";
import { dbAPISlice } from "./slices/with-rtk-query/api/db-api-slice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    auth: authReducer,
    [dbAPISlice.reducerPath]: dbAPISlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dbAPISlice.middleware),
});

export { store, addJob, removeJob, fetchJobs, userLogin, registerUser };
export type AppDispatch = typeof store.dispatch;
