import { createAsyncThunk } from "@reduxjs/toolkit";

const BACKEND_URL = "http://localhost:3000/";

export const userLogin = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      //If successful, http-only cookie with jwt token will have been set on the server
      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue("Error: Unable to send request.");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Success:", result);
      return result;
    } catch (error) {
      console.error("Error:", error);
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
