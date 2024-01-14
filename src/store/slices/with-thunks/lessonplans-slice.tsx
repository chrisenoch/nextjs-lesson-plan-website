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
  },
  reducers: {},
  extraReducers(builder) {
    //toggle bookmark
    builder.addCase(toggleBookmark.pending, (state) => {
      handlePending("toggleBookmark", state);
    });
    builder.addCase(toggleBookmark.fulfilled, (state, action) => {
      handleFulfilled("toggleBookmark", state, action);

      if (!action.payload.isError) {
        //Steps
        // user clicks bookmark
        // depending on new value, this is sent in http request
        //if success, do nothing. FetchBookmarks will automatically re-run and update the bookmark.
        //if error

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
    console.log("in fetchBookmarks");
    try {
      const response = await fetch(
        `http://localhost:3000/api/lesson-plan-bookmarks`
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
  async (
    data: { jobTitle: string; jobDescription: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/lessonPlanBookmarks",
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

export const lessonPlansReducer = lessonPlansSlice.reducer;
export const selectAllBookmarks = (state) => state.lessonPlansSlice.bookmarks;
export const selectFetchBookmarks = (state) =>
  state.lessonPlansSlice.fetchBookmarks;
export const selectToggleBookmark = (state) =>
  state.lessonPlansSlice.toggleBookmark;
