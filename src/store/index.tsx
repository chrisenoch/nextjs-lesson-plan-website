import { configureStore } from "@reduxjs/toolkit";
import {
  jobsReducer,
  addJob,
  removeJob,
  fetchJobs,
  selectAllJobs,
  selectJobsError,
  selectJobsIsLoading,
} from "./slices/with-thunks/jobs-slice";
import {
  authReducer,
  reinitWasLastRefreshSuccessful,
} from "./slices/with-thunks/auth-slice";
import {
  userLogin,
  getAccessTokenWithRefreshToken,
  userLogout,
  getAccessTokenWithRefreshTokenOnAppMount,
} from "./slices/with-thunks/auth-thunks";
import { dbAPISlice } from "./slices/with-rtk-query/api/db-api-slice";

const store = configureStore({
  reducer: {
    jobsSlice: jobsReducer,
    authSlice: authReducer,
    [dbAPISlice.reducerPath]: dbAPISlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dbAPISlice.middleware),
});

export {
  store,
  addJob,
  removeJob,
  fetchJobs,
  userLogin,
  userLogout,
  reinitWasLastRefreshSuccessful,
  getAccessTokenWithRefreshToken,
  getAccessTokenWithRefreshTokenOnAppMount,
  selectAllJobs,
  selectJobsError,
  selectJobsIsLoading,
};
export type AppDispatch = typeof store.dispatch;
