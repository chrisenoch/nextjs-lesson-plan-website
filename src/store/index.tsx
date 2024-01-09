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
  selectUserInfo,
} from "./slices/with-thunks/auth-slice";
import {
  userLogin,
  getAccessTokenWithRefreshToken,
  userLogout,
  getAccessTokenWithRefreshTokenOnAppMount,
} from "./slices/with-thunks/auth-thunks";
import { dbAPISlice } from "./slices/with-rtk-query/api/db-api-slice";
import {
  navReducer,
  updatePathname,
  updatePathnameCallbacks,
} from "./slices/with-thunks/nav-slice";

const store = configureStore({
  reducer: {
    jobsSlice: jobsReducer,
    authSlice: authReducer,
    navSlice: navReducer,
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
  selectAllJobs,
  selectJobsByUserId,
  selectAddJob,
  selectFetchJobs,
  userLogin,
  userLogout,
  reinitWasLastRefreshSuccessful,
  increaseLogoutCount,
  getAccessTokenWithRefreshToken,
  getAccessTokenWithRefreshTokenOnAppMount,
  selectUserInfo,
  updatePathname,
  updatePathnameCallbacks,
};
export type AppDispatch = typeof store.dispatch;
