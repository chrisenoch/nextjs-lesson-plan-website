import { configureStore } from "@reduxjs/toolkit";
import {
  jobsReducer,
  addJob,
  removeJob,
  fetchJobs,
} from "./slices/with-thunks/jobs-slice";
import { authReducer } from "./slices/with-thunks/auth-slice";
import { userLogin, registerUser } from "./slices/with-thunks/auth-thunks";
import { apiSlice } from "./slices/with-rtk-query/api/api-slice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export { store, addJob, removeJob, fetchJobs, userLogin, registerUser };
export type AppDispatch = typeof store.dispatch;
