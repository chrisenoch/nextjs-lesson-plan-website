// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",

  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getJobs: builder.query({
      query: () => "/jobs",
    }),
    addNewJob: builder.mutation({
      query: (job) => ({
        url: "/jobs",
        method: "POST",
        body: job,
      }),
    }),
  }),
});

export const { useGetJobsQuery, useAddNewJobMutation } = apiSlice;
