import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "job",
  initialState: [],
  reducers: {
    addJob(state, action) {
      state.push(action.payload);
    },
    removeJob(state, action) {
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addJob, removeJob } = jobsSlice.actions;
export const jobsReducer = jobsSlice.reducer;
