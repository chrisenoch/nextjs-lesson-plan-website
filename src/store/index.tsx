import { configureStore } from "@reduxjs/toolkit";
import {
  jobsReducer,
  addJob,
  removeJob,
  fetchJobs,
} from "./slices/with-thunks/jobs-slice";
import { authReducer } from "./slices/with-thunks/auth-slice";
import { userLogin, registerUser } from "./slices/with-thunks/auth-thunks";
import { internalAPISlice } from "./slices/with-rtk-query/api/internal-api-slice";
import { dbAPISlice } from "./slices/with-rtk-query/api/db-api-slice";

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    auth: authReducer,
    [internalAPISlice.reducerPath]: internalAPISlice.reducer,
    [dbAPISlice.reducerPath]: dbAPISlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(internalAPISlice.middleware),
});

export { store, addJob, removeJob, fetchJobs, userLogin, registerUser };
export type AppDispatch = typeof store.dispatch;
