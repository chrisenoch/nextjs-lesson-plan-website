import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "./thunk-helpers";

const lessonPlansSlice = createSlice({
  name: "lessonPlansSlice",
  initialState: {
    lessonPlans: [],

    fetchLessonPlans: {
      isError: false,
      isLoading: true,
      message: "",
      statusCode: null,
    },
  },
  reducers: {},
  extraReducers(builder) {
    //fetch lesson plans
    builder.addCase(fetchLessonPlans.pending, (state) => {
      console.log("in lp pending");
      handlePending("fetchLessonPlans", state);
    });
    builder.addCase(fetchLessonPlans.fulfilled, (state, action) => {
      console.log("in lp fulfilled");
      handleFulfilled("fetchLessonPlans", state, action);

      if (!action.payload.isError) {
        state.lessonPlans = action.payload.lessonPlans;
        state.fetchLessonPlans.isError = false;
      } else {
        state.fetchLessonPlans.isError = true;
      }
    });
    builder.addCase(fetchLessonPlans.rejected, (state, action) => {
      console.log("in lp rejected");
      handleRejected("fetchLessonPlans", state, action);
    });
  },
});

export const fetchLessonPlans = createAsyncThunk(
  "lessonPlansSlice/fetchLessonPlans ",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/lesson-plans`);
      const payload = await response.json();
      return { ...payload, status: response.status };
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

// export const { reinitWasLastRefreshSuccessful, increaseLogoutCount } = authSlice.actions;
export const lessonPlansReducer = lessonPlansSlice.reducer;
export const selectAllLessonPlans = (state) =>
  state.lessonPlansSlice.lessonPlans;
export const selectFetchLessonPlans = (state) =>
  state.lessonPlansSlice.fetchLessonPlans;
