// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const internalAPISlice = createApi({
  reducerPath: "internal-api",
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
  internalAPISlice;
