import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  userLogin,
  checkAuthenticated,
  userLogout,
  getAccessTokenWithRefreshToken,
  getAccessTokenWithRefreshTokenOnAppMount,
} from "./auth-thunks";

const initialState = {
  isAppMounting: false,
  isLoading: true,
  userInfo: null,
  wasLastRefreshSuccessful: null,
  loginError: null,
  logoutError: null,
  checkAuthenticatedError: null,
  refreshTokenError: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    reinitWasLastRefreshSuccessful(state) {
      state.wasLastRefreshSuccessful = null;
    },
  },
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
    //Get access token with refresh token in the background.
    //Do not change isLoading for any getAccessTokenWithRefreshToken case. The access token being updated should happen
    //invisibly and should not be reflected in the UI.
    builder.addCase(getAccessTokenWithRefreshToken.pending, (state, action) => {
      //Do not set isLoading.
      state.refreshTokenError = null;
      state.wasLastRefreshSuccessful = null;
    });
    builder.addCase(
      getAccessTokenWithRefreshToken.fulfilled,
      (state, action) => {
        //Do not set isLoading.

        handleRefreshState(action, state);
      }
    );
    builder.addCase(
      getAccessTokenWithRefreshToken.rejected,
      (state, action) => {
        //Do not set isLoading.
        state.refreshTokenError = action.payload;
      }
    );
    //Send refresh token on app mount. In this case, we DO want to show the loading state
    builder.addCase(
      getAccessTokenWithRefreshTokenOnAppMount.pending,
      (state, action) => {
        state.isLoading = true;
        state.refreshTokenError = null;
        state.wasLastRefreshSuccessful = null;
      }
    );
    builder.addCase(
      getAccessTokenWithRefreshTokenOnAppMount.fulfilled,
      (state, action) => {
        state.isLoading = false;
        handleRefreshState(action, state);
      }
    );
    builder.addCase(
      getAccessTokenWithRefreshTokenOnAppMount.rejected,
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
      state.isLoading = false;
      setUserInfoFromLoggedInStatus(action, state);
    });
    builder.addCase(checkAuthenticated.rejected, (state, action) => {
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

function handleRefreshState(action, state) {
  if (action.payload.isLoggedIn) {
    state.userInfo = action.payload;
    state.wasLastRefreshSuccessful = true;
  } else {
    state.userInfo = null;
    state.wasLastRefreshSuccessful = false;
  }
}

function setUserInfoFromLoggedInStatus(action, state) {
  if (action.payload.isLoggedIn) {
    state.userInfo = action.payload;
  } else {
    state.userInfo = null;
  }
}

export const { reinitWasLastRefreshSuccessful } = authSlice.actions;
export const authReducer = authSlice.reducer;
