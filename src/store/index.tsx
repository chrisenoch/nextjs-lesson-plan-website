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
import {
  lessonPlansReducer,
  selectAllBookmarks,
  selectFetchBookmarks,
  selectToggleBookmark,
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
  increaseLogoutCount,
  getAccessTokenWithRefreshToken,
  getAccessTokenWithRefreshTokenOnAppMount,
  selectUserInfo,
  selectLoginStatus,
  selectUserLogin,
  selectGetAccessTokenWithRefreshTokenOnAppMount,
};

export { selectAllBookmarks, selectFetchBookmarks, selectToggleBookmark };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
