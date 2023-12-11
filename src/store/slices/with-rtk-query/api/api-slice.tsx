// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ["Job"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/jobs",
      providesTags: ["Job"],
    }),
    addNewJob: builder.mutation({
      query: (job) => ({
        url: "/jobs",
        method: "POST",
        body: job,
      }),
      invalidatesTags: ["Job"],
    }),
    getUserDetails: builder.query({
      query: (userId: number) => {
        console.log("userId in getUserDetails query method");
        return {
          url: `/user/profile?userId=${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetJobsQuery, useAddNewJobMutation, useGetUserDetailsQuery } =
  apiSlice;
