import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  userLogin,
  checkAuthenticated,
  userLogout,
  getAccessTokenWithRefreshToken,
} from "./auth-thunks";

const initialState = {
  isLoading: true,
  userInfo: null,
  wasLastRefreshSuccessful: null,
  loginError: null,
  logoutError: null,
  checkAuthenticatedError: null,
  refreshTokenError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //login user
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
      state.loginError = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      setUserInfoFromLoggedInStatus(action, state);
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.loginError = action.payload;
    });
    //logout user
    builder.addCase(userLogout.pending, (state, action) => {
      state.isLoading = true;
      state.logoutError = null;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = null;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.logoutError = action.payload;
    });
    //Get access token with refresh token
    builder.addCase(getAccessTokenWithRefreshToken.pending, (state, action) => {
      state.isLoading = true;
      state.refreshTokenError = null;
      state.wasLastRefreshSuccessful = null;
    });
    builder.addCase(
      getAccessTokenWithRefreshToken.fulfilled,
      (state, action) => {
        state.isLoading = false;
        setUserInfoFromLoggedInStatus(action, state);
        if (action.payload.isLoggedIn) {
          state.userInfo = action.payload;
          state.wasLastRefreshSuccessful = true;
        } else {
          state.userInfo = null;
          state.wasLastRefreshSuccessful = false;
        }
      }
    );
    builder.addCase(
      getAccessTokenWithRefreshToken.rejected,
      (state, action) => {
        state.isLoading = false;
        state.refreshTokenError = action.payload;
      }
    );
    //Check if authenticated. For example, when app loads.
    builder.addCase(checkAuthenticated.pending, (state, action) => {
      state.isLoading = true;
      state.checkAuthenticatedError = null;
    });
    builder.addCase(checkAuthenticated.fulfilled, (state, action) => {
      console.log("checkAuthenticated.fulfilled");
      state.isLoading = false;
      setUserInfoFromLoggedInStatus(action, state);
    });
    builder.addCase(checkAuthenticated.rejected, (state, action) => {
      console.log("checkAuthenticated.rejected");
      state.isLoading = false;
      state.checkAuthenticatedError = action.payload;
    });

    // //register user
    // builder.addCase(registerUser.pending, (state, action) => {
    //   state.isLoading = true;
    //   state.error = null;
    // });
    // builder.addCase(registerUser.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.success = true; // registration successful
    // });
    // builder.addCase(registerUser.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});

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

export const authReducer = authSlice.reducer;
