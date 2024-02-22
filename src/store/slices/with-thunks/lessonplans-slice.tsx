import { createSelector, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "./thunk-helpers";
import { RootState } from "@/store";
import { StandardResponseInfo } from "@/models/types/DataFetching/StandardResponseInfo";
import { LessonPlanBoomark } from "@/models/types/LessonPlans/LessonPlanBookmark";

const initialState: {
  bookmarks: LessonPlanBoomark[];
  toggleBookmark: StandardResponseInfo;
  fetchBookmarks: StandardResponseInfo;
} = {
  bookmarks: [],

  toggleBookmark: {
    isError: false,
    isLoading: false,
    message: "",
    statusCode: null,
  },

  fetchBookmarks: {
    isError: false,
    isLoading: true,
    message: "",
    statusCode: null,
  },
};

const lessonPlansSlice = createSlice({
  name: "lessonPlansSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //toggle bookmark
    builder.addCase(toggleBookmark.pending, (state) => {
      handlePending("toggleBookmark", state);
    });
    builder.addCase(toggleBookmark.fulfilled, (state, action) => {
      handleFulfilled("toggleBookmark", state, action);

      if (!action.payload.isError) {
        state.bookmarks = action.payload.bookmarks;
        state.toggleBookmark.isError = false;
      } else {
        state.toggleBookmark.isError = true;
      }
    });
    builder.addCase(toggleBookmark.rejected, (state, action) => {
      handleRejected("toggleBookmark", state, action);
    });

    //fetch bookmarks
    builder.addCase(fetchBookmarks.pending, (state) => {
      handlePending("fetchBookmarks", state);
    });
    builder.addCase(fetchBookmarks.fulfilled, (state, action) => {
      handleFulfilled("fetchBookmarks", state, action);

      if (!action.payload.isError) {
        console.log("action.paylaod in fetchBookmarks");
        console.log(action.payload);
        state.bookmarks = action.payload.bookmarks;
        state.fetchBookmarks.isError = false;
      } else {
        state.fetchBookmarks.isError = true;
      }
    });
    builder.addCase(fetchBookmarks.rejected, (state, action) => {
      handleRejected("fetchBookmarks", state, action);
    });
  },
});

export const fetchBookmarks = createAsyncThunk(
  "lessonPlansSlice/fetchBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/lesson-plan-bookmarks`
      );
      const payload = await response.json();
      return { ...payload, status: response.status };
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

export const toggleBookmark = createAsyncThunk(
  "lessonPlansSlice/toggle-bookmark",
  async (lessonPlanId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/lesson-plan-bookmarks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(lessonPlanId),
        }
      );
      const payload = await response.json();
      return { ...payload, status: response.status };
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

export const lessonPlansReducer = lessonPlansSlice.reducer;
export const selectAllBookmarks = (state: RootState) =>
  state.lessonPlansSlice.bookmarks;
export const selectFetchBookmarks = (state: RootState) =>
  state.lessonPlansSlice.fetchBookmarks;
export const selectToggleBookmark = (state: RootState) =>
  state.lessonPlansSlice.toggleBookmark;
