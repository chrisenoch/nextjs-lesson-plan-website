import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  userLogin,
  checkAuthenticated,
  userLogout,
} from "./auth-thunks";

const initialState = {
  isLoading: true,
  userInfo: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //login user
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      setUserInfoFromLoggedInStatus(action, state);
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //logout user
    builder.addCase(userLogout.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = null;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //Check if authenticated. For example, when app loads.
    builder.addCase(checkAuthenticated.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(checkAuthenticated.fulfilled, (state, action) => {
      state.isLoading = false;
      setUserInfoFromLoggedInStatus(action, state);
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
function setUserInfoFromLoggedInStatus(
  action,
  state: { isLoading: boolean; userInfo: null; error: null; success: boolean }
) {
  if (action.payload.isLoggedIn) {
    state.userInfo = action.payload;
  } else {
    state.userInfo = null;
  }
}
