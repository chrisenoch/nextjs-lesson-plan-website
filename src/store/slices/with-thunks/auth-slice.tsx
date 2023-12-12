import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, checkAuthenticated } from "./auth-thunks";

// initialize userToken from local storage
// const userToken = localStorage.getItem("userToken")
//   ? localStorage.getItem("userToken")
//   : null;

const initialState = {
  isLoading: true,
  userInfo: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // change this, to delete http-only cookie.
      state.isLoading = false;
      state.userInfo = null;
      state.error = null;
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
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //Check if authenticated
    builder.addCase(checkAuthenticated.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(checkAuthenticated.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(checkAuthenticated.rejected, (state, action) => {
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
