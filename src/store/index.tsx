import { configureStore } from "@reduxjs/toolkit";
import {
  jobsReducer,
  addJob,
  removeJob,
  fetchJobs,
} from "./slices/with-thunks/jobs-slice";
import {
  authReducer,
  reinitWasLastRefreshSuccessful,
} from "./slices/with-thunks/auth-slice";
import {
  userLogin,
  registerUser,
  getAccessTokenWithRefreshToken,
  userLogout,
  getAccessTokenWithRefreshTokenOnAppMount,
} from "./slices/with-thunks/auth-thunks";
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

export {
  store,
  addJob,
  removeJob,
  fetchJobs,
  userLogin,
  registerUser,
  userLogout,
  reinitWasLastRefreshSuccessful,
  getAccessTokenWithRefreshToken,
  getAccessTokenWithRefreshTokenOnAppMount,
};
export type AppDispatch = typeof store.dispatch;
