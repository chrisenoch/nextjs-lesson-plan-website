import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    error: null,
    isLoading: true,
  },
  reducers: {
    addJob(state, action) {
      state.jobs.push(action.payload);
      900000;
    },
    // removeJob(state, action) {
    //   const index = state.indexOf(action.payload);
    //   state.splice(index, 1);
    // },
  },
  extraReducers(builder) {
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
  },
});

export const fetchJobs = createAsyncThunk("job/fetch", async () => {
  const response = await fetch("http://localhost:3001/jobs");
  // DEV ONLY!!!
  await pause(1000);

  const jobs = await response.json();
  console.log("jobs resp");
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
export const selectAllJobs = (state) => state.jobs;
