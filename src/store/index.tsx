import { configureStore } from "@reduxjs/toolkit";
import {
  jobsReducer,
  deleteJob,
  fetchJobs,
  selectAllJobs,
  selectJobsByUserId,
  addJob,
  selectAddJob,
  selectFetchJobs,
} from "./slices/with-thunks/jobs-slice";
import {
  authReducer,
  increaseLogoutCount,
  reinitWasLastRefreshSuccessful,
  selectGetAccessTokenWithRefreshTokenOnAppMount,
  selectLoginStatus,
  selectUserInfo,
  selectUserLogin,
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

export { store };

export {
  addJob,
  deleteJob,
  fetchJobs,
  selectAllJobs,
  selectJobsByUserId,
  selectAddJob,
  selectFetchJobs,
};

export {
  userLogin,
  userLogout,
  reinitWasLastRefreshSuccessful,
  increaseLogoutCount,
  getAccessTokenWithRefreshToken,
  getAccessTokenWithRefreshTokenOnAppMount,
  selectUserInfo,
  selectLoginStatus,
  selectUserLogin,
  selectGetAccessTokenWithRefreshTokenOnAppMount,
};

export type AppDispatch = typeof store.dispatch;
