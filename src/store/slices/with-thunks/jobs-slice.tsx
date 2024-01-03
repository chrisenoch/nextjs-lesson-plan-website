import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "jobsSlice",
  initialState: {
    jobs: [],
    addJobError: null,
    addJobResponse: null,
    error: null,
    isLoading: true,
  },
  reducers: {},
  extraReducers(builder) {
    //addJob
    builder.addCase(addJob.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(addJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addJobResponse = action.payload;
      console.log("addJob fulfilled, action ");
      console.log(action);

      if (!action.payload.isError) {
        state.jobs.push(action.payload.job);
      }
    });
    builder.addCase(addJob.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //fetch jobs
    builder.addCase(fetchJobs.pending, (state) => {
      state.error = null;
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
    builder.addCase(deleteJob.pending, (state) => {
      state.error = null;
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

export const fetchJobs = createAsyncThunk("jobsSlice/fetchJobs", async () => {
  const response = await fetch(`http://localhost:3000/api/jobs`);
  const payload = await response.json();
  return payload.jobs;
});

export const deleteJob = createAsyncThunk(
  "jobsSlice/delete-job",
  async (id: string, { rejectWithValue, dispatch, getState }) => {
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

export const addJob = createAsyncThunk(
  "jobsSlice/add-job",
  async (
    data: { jobTitle: string; jobDescription: string },
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
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

export const jobsReducer = jobsSlice.reducer;
export const selectAddJobResponse = (state) =>
  state.jobsSlice.addJobThunkResponse;
export const selectAllJobs = (state) => state.jobsSlice.jobs;
export const selectJobsByUserId = (state, userId: string | undefined) => {
  if (userId === null || userId === undefined) {
    return [];
  }

  return state.jobsSlice.jobs.filter((job) => {
    console.log("job in filter method");
    console.log(job);

    return job.userId === userId;
  });
};

export const selectJobsError = (state) => state.jobsSlice.error;
export const selectJobsIsLoading = (state) => state.jobsSlice.isLoading;
