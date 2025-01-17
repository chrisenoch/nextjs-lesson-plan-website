import { createAsyncThunk } from "@reduxjs/toolkit";
import { increaseLogoutCount } from "./auth-slice";

export const userLogin = createAsyncThunk(
  "authSlice/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const payload = await response.json();
      //const delayForDev = await delay(() => console.log("delay for dev"), 500);

      //If successful, http-only cookie with jwt token will have been set on the server
      return { ...payload, status: response.status };
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

export const userLogout = createAsyncThunk(
  "authSlice/logout",
  async (_: void, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/with-refresh/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          //body: JSON.stringify({shouldLogout:true}),
        }
      );
      const payload = await response.json();
      dispatch(increaseLogoutCount());
      //If successful, http-only cookie with jwt token will have been set on the server
      return { ...payload, status: response.status };
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

//If the refresh happens in the background, we DON'T show the loading state
//I wrote two functions (getAccessTokenWithRefreshToken and getAccessTokenWithRefreshTokenOnAppMount) to keep the redux logic pure.
export const getAccessTokenWithRefreshToken = createAsyncThunk(
  "authSlice/refresh",
  async (_: void, { rejectWithValue }) => {
    console.log("sending getAccessTokenWithRefreshToken");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/with-refresh/refresh`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const payload = await response.json();
      //If successful, http-only cookie with jwt token will have been set on the server
      return { ...payload, status: response.status };
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

//If the refresh request happens in the foreground (i.e. when the app is being loaded), we DO show the loading state
//I wrote two functions (getAccessTokenWithRefreshToken and getAccessTokenWithRefreshTokenOnAppMount) to keep the redux logic pure.
export const getAccessTokenWithRefreshTokenOnAppMount = createAsyncThunk(
  "authSlice/refresh-on-app-mount",
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/with-refresh/refresh`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const payload = await response.json();
      //If successful, http-only cookie with jwt token will have been set on the server
      return { ...payload, status: response.status };
    } catch (error) {
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

//Example from docs: https://redux-toolkit.js.org/api/createAsyncThunk
// const fetchUserById = createAsyncThunk(
//   "users/fetchByIdStatus",
//   async (userId: number, thunkAPI) => {
//     const response = await userAPI.fetchById(userId);
//     return response.data;
//   }
// );
