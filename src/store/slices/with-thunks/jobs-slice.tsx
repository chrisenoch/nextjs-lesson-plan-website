import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "jobsSlice",
  initialState: {
    jobs: [],
    error: null,
    isLoading: true,
  },
  reducers: {
    addJob(state, action) {
      state.jobs.push(action.payload);
    },
  },
  extraReducers(builder) {
    //fetch jobs
    builder.addCase(fetchJobs.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload;
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //delete job
    builder.addCase(deleteJob.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.jobs.findIndex((job) => job.id === action.payload);
      state.jobs.splice(index, 1);
    });
    builder.addCase(deleteJob.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const fetchJobs = createAsyncThunk("jobsSlice/fetch", async () => {
  const response = await fetch("http://localhost:3001/jobs");
  // DEV ONLY!!!
  await pause(1000);
  const jobs = await response.json();
  return jobs;
});

export const deleteJob = createAsyncThunk(
  "jobsSlice/delete-job",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      //const result = await response.json();
      return id;
    } catch (error) {
      return rejectWithValue("Error: Unable to delete job.");
    }
  }
);

// DEV ONLY!!!
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const { addJob } = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;
export const selectAllJobs = (state) => state.jobsSlice.jobs;
export const selectJobsError = (state) => state.jobsSlice.error;
export const selectJobsIsLoading = (state) => state.jobsSlice.isLoading;
