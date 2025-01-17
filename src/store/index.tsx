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
  selectUserSession,
  selectUserLogin,
  selectUserSessionStatus,
} from "./slices/with-thunks/auth-slice";
import {
  userLogin,
  getAccessTokenWithRefreshToken,
  userLogout,
  getAccessTokenWithRefreshTokenOnAppMount,
} from "./slices/with-thunks/auth-thunks";
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
  },
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
  selectUserSession,
  selectUserSessionStatus,
  selectUserLogin,
  selectGetAccessTokenWithRefreshTokenOnAppMount,
};

export { selectAllBookmarks, selectFetchBookmarks, selectToggleBookmark };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
