import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "./thunk-helpers";
import { RootState } from "@/store";
import { StandardResponseInfo } from "@/models/types/DataFetching/StandardResponseInfo";
import { Job } from "@/models/types/Jobs/Jobs";

const initialState: {
  jobs: Job[];
  addJob: StandardResponseInfo;
  fetchJobs: StandardResponseInfo;
  deleteJob: StandardResponseInfo;
} = {
  jobs: [],

  addJob: {
    isError: false,
    isLoading: false,
    message: "",
    statusCode: null,
  },

  fetchJobs: {
    isError: false,
    isLoading: true,
    message: "",
    statusCode: null,
  },
  deleteJob: {
    isError: false,
    isLoading: true,
    message: "",
    statusCode: null,
  },
};

const jobsSlice = createSlice({
  name: "jobsSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //addJob
    builder.addCase(addJob.pending, (state) => {
      handlePending("addJob", state);
    });
    builder.addCase(addJob.fulfilled, (state, action) => {
      handleFulfilled("addJob", state, action);

      if (!action.payload.isError) {
        state.jobs.push(action.payload.job);
        state.addJob.isError = false;
      } else {
        state.addJob.isError = true;
      }
    });
    builder.addCase(addJob.rejected, (state, action) => {
      handleRejected("addJob", state, action);
    });

    //fetch jobs
    builder.addCase(fetchJobs.pending, (state) => {
      handlePending("fetchJobs", state);
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      handleFulfilled("fetchJobs", state, action);

      if (!action.payload.isError) {
        state.jobs = action.payload.collection;
        state.fetchJobs.isError = false;
      } else {
        state.fetchJobs.isError = true;
      }
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      handleRejected("fetchJobs", state, action);
    });

    //delete job
    builder.addCase(deleteJob.pending, (state) => {
      handlePending("deleteJob", state);
    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      handleFulfilled("deleteJob", state, action);
      if (!action.payload.isError) {
        state.deleteJob.isError = false;
        const index = state.jobs.findIndex(
          (job) => job.id === action.payload.id
        );
        if (index !== -1) {
          state.jobs.splice(index, 1);
        }
      } else {
        state.deleteJob.isError = true;
      }
    });
    builder.addCase(deleteJob.rejected, (state, action) => {
      handleRejected("deleteJob", state, action);
    });
  },
});

export const fetchJobs = createAsyncThunk(
  "jobsSlice/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`
      );
      const payload = await response.json();
      return { ...payload, status: response.status };
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

export const deleteJob = createAsyncThunk(
  "jobsSlice/delete-job",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        }
      );
      const payload = await response.json();
      return { ...payload, status: response.status };
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

export const addJob = createAsyncThunk(
  "jobsSlice/add-job",
  async (
    data: {
      jobTitle: string;
      jobDescription: string;
      jobLocation: string;
      jobCompany: string;
      jobSalary: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const payload = await response.json();
      return { ...payload, status: response.status };
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

export const jobsReducer = jobsSlice.reducer;
export const selectAllJobs = (state: RootState) => state.jobsSlice.jobs;
export const selectJobsByUserId = createSelector(
  [
    (state: RootState) => state.jobsSlice.jobs,
    (state: RootState) => {
      if (state.authSlice.userSession.status === "ACTIVE") {
        return state.authSlice.userSession.id;
      } else {
        return null;
      }
    },
  ],
  (jobs, userId) => {
    if (userId === null || userId === undefined) {
      return [];
    }
    return jobs.filter((job) => job.userId === userId);
  }
);

export const selectFetchJobs = (state: RootState) => state.jobsSlice.fetchJobs;
export const selectAddJob = (state: RootState) => state.jobsSlice.addJob;
