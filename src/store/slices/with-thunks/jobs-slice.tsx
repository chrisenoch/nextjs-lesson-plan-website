import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "jobsSlice",
  initialState: {
    jobs: [],
    jobsAddedByLoggedInUser: [],
    addJobThunkError: null,
    addJobThunkResponse: null,
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
    builder.addCase(addJobThunk.pending, (state) => {
      state.isLoading = true;
      state.addJobThunkError = null;
    });
    builder.addCase(addJobThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addJobThunkResponse = action.payload;
    });
    builder.addCase(addJobThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.addJobThunkError = action.error;
    });

    //fetch jobs
    builder.addCase(fetchJobs.pending, (state) => {
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

    //fetch jobs by userId
    builder.addCase(fetchJobsByUserId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchJobsByUserId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobsAddedByLoggedInUser = action.payload;
    });
    builder.addCase(fetchJobsByUserId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //delete job
    builder.addCase(deleteJob.pending, (state) => {
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

export const fetchJobsByUserId = createAsyncThunk(
  "jobsSlice/fetchJobsByUserId",
  async (userId: string) => {
    const response = await fetch(
      `http://localhost:3000/api/jobs?userId=${userId}`
    );
    const payload = await response.json();
    return payload.jobs;
  }
);

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
      const stateInDeleteJobs = getState();
      const userInfoId = stateInDeleteJobs.authSlice?.userInfo?.id;
      if (userInfoId) {
        await dispatch(fetchJobsByUserId(userInfoId));
      }

      //const result = await response.json();
      return id;
    } catch (error) {
      return rejectWithValue("Error: Unable to delete job.");
    }
  }
);

export const addJobThunk = createAsyncThunk(
  "jobsSlice/add-job",
  async (
    data: { jobTitle: string; jobDescription: string },
    { rejectWithValue, getState, dispatch }
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

      // const stateInAddJobThunk = getState();
      // const userInfoId = stateInAddJobThunk.authSlice?.userInfo?.id;
      // if (userInfoId) {
      //   await dispatch(fetchJobsByUserId(userInfoId));
      // }
      // await dispatch(fetchJobs());

      return result;
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

export const { addJob } = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;
export const selectAddJobThunkResponse = (state) =>
  state.jobsSlice.addJobThunkResponse;
export const selectAllJobs = (state) => state.jobsSlice.jobs;
export const selectJobsByUserId = (state) =>
  state.jobsSlice.jobsAddedByLoggedInUser;
export const selectJobsError = (state) => state.jobsSlice.error;
export const selectJobsIsLoading = (state) => state.jobsSlice.isLoading;
