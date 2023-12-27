import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  userLogout,
  getAccessTokenWithRefreshToken,
  getAccessTokenWithRefreshTokenOnAppMount,
} from "./auth-thunks";
import { UserRole } from "@/models/types/UserRole";
import { UserInfo } from "@/models/types/UserInfo";

const initialState: {
  isLoading: boolean;
  userInfo: UserInfo | null;
  wasLastRefreshSuccessful: boolean | null;
  loginError: string | null;
  logoutError: string | null;
  checkAuthenticatedError: string | null;
  refreshTokenError: string | null;
} = {
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
    //Login user
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
      state.loginError = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      setUserInfoFromLoggedInStatus(action, state);
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log("login rejected, action.payload below ");
      console.log(action.payload);
      state.isLoading = false;
      state.loginError = action.payload;
    });
    //Logout user
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true;
      state.logoutError = null;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
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
    builder.addCase(getAccessTokenWithRefreshToken.pending, (state) => {
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
      (state) => {
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
  console.log("in setUserInfoFromLoggedInStatus");
  if (action.payload.isLoggedIn) {
    state.userInfo = action.payload;
    console.log("userInfo object in setUserInfoFromLoggedInStatus: ");
    console.log(state.userInfo);
  } else {
    state.userInfo = null;
  }
}

export const { reinitWasLastRefreshSuccessful } = authSlice.actions;
export const authReducer = authSlice.reducer;
