import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./auth-thunks";

// initialize userToken from local storage
// const userToken = localStorage.getItem("userToken")
//   ? localStorage.getItem("userToken")
//   : null;

const initialState = {
  isLoading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // delete token from storage
      state.isLoading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers(builder) {
    //login user
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
      state.userToken = action.payload.userToken;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //register user
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true; // registration successful
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;
