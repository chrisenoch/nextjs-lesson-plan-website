// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const internalAPISlice = createApi({
  reducerPath: "internal-api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),

  endpoints: (builder) => ({
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

export const { useGetUserDetailsQuery } = internalAPISlice;
