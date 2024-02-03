import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "./thunk-helpers";

const jobsSlice = createSlice({
  name: "jobsSlice",
  initialState: {
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
  },
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
        state.jobs = action.payload.jobs;
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
      const response = await fetch(`http://localhost:3000/api/jobs`);
      const payload = await response.json();
      return { ...payload, status: response.status };
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

export const deleteJob = createAsyncThunk(
  "jobsSlice/delete-job",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/jobs`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
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
      const response = await fetch("http://localhost:3000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const payload = await response.json();
      return { ...payload, status: response.status };
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

export const jobsReducer = jobsSlice.reducer;
export const selectAllJobs = (state) => state.jobsSlice.jobs;
export const selectJobsByUserId = createSelector(
  [(state) => state.jobsSlice.jobs, (state) => state.authSlice.userInfo?.id],
  (jobs, userId) => {
    if (userId === null || userId === undefined) {
      return [];
    }
    return jobs.filter((job) => job.userId === userId);
  }
);

export const selectFetchJobs = (state) => state.jobsSlice.fetchJobs;
export const selectAddJob = (state) => state.jobsSlice.addJob;
