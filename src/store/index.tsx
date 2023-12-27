import { configureStore } from "@reduxjs/toolkit";
import {
  jobsReducer,
  addJob,
  deleteJob,
  fetchJobs,
  selectAllJobs,
  selectJobsError,
  selectJobsIsLoading,
  selectJobsByUserId,
  fetchJobsByUserId,
} from "./slices/with-thunks/jobs-slice";
import {
  authReducer,
  reinitWasLastRefreshSuccessful,
  selectUserInfo,
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
  deleteJob,
  fetchJobs,
  fetchJobsByUserId,
  selectAllJobs,
  selectJobsByUserId,
  selectJobsError,
  selectJobsIsLoading,
  userLogin,
  userLogout,
  reinitWasLastRefreshSuccessful,
  getAccessTokenWithRefreshToken,
  getAccessTokenWithRefreshTokenOnAppMount,
  selectUserInfo,
};
export type AppDispatch = typeof store.dispatch;
