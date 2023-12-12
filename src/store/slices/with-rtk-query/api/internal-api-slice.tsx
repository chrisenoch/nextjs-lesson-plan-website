// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const internalAPISlice = createApi({
  reducerPath: "internal-api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["CheckAuthenticated"],
  endpoints: (builder) => ({
    getCheckAuthenticated: builder.query({
      query: () => {
        console.log("userId in getUserDetails query method");
        return {
          url: "/auth/check-authenticated",
          method: "GET",
        };
      },
      providesTags: ["CheckAuthenticated"],
    }),
    invalidateCheckAuthenticated: builder.mutation({
      query: () => {
        console.log("userId in invalidateCheckAuthenticated query method");
        return {
          url: "/auth/user-details",
          method: "POST",
        };
      },
      invalidatesTags: ["CheckAuthenticated"],
    }),
  }),
});

export const {
  useGetCheckAuthenticatedQuery,
  useInvalidateCheckAuthenticatedMutation,
} = internalAPISlice;
