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
    removeJob(state, action) {
      //Will receive the job id as an argument
      const index = state.jobs.findIndex((job) => job.id === action.payload.id);
      state.jobs.splice(index, 1);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchJobs.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      console.log("state then state.jobs in fetchJobs.fulfilled");
      console.log(state);
      console.log(state.jobs);

      console.log("action and then action.payload in fetchJobs.fulfilled");
      console.log(action);
      console.log(action.payload);

      state.isLoading = false;
      state.jobs = action.payload;
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
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

  console.log("jobs in fetchJobs thunk");
  console.log(jobs);
  return jobs;
});

// DEV ONLY!!!
const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const { addJob, removeJob } = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;
export const selectAllJobs = (state) => {
  console.log("state, state.jobsSlice in selectAllJobs");
  console.log(state);
  console.log(state.jobsSlice);

  return state.jobsSlice.jobs;
};
export const selectJobsError = (state) => state.jobsSlice.error;
export const selectJobsIsLoading = (state) => state.jobsSlice.isLoading;
