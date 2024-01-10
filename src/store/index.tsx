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
import {
  lessonPlansReducer,
  selectFetchLessonPlans,
} from "./slices/with-thunks/lessonplans-slice";

const store = configureStore({
  reducer: {
    jobsSlice: jobsReducer,
    authSlice: authReducer,
    lessonPlansSlice: lessonPlansReducer,
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
  selectUserLogin,
  selectGetAccessTokenWithRefreshTokenOnAppMount,
};

export { selectFetchLessonPlans };
export type AppDispatch = typeof store.dispatch;
