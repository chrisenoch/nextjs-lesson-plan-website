// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dbAPISlice = createApi({
  reducerPath: "db-api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  tagTypes: ["Job"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/jobs",
      providesTags: ["Job"],
    }),
    addNewJob: builder.mutation({
      query: (job) => {
        console.log("inside addNewJob rtq query with job:");
        console.log(job);
        return {
          url: "/jobs",
          method: "POST",
          body: job,
        };
      },

      invalidatesTags: ["Job"],
    }),
  }),
});

export const { useGetJobsQuery, useAddNewJobMutation } = dbAPISlice;
