import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  userLogout,
  getAccessTokenWithRefreshToken,
  getAccessTokenWithRefreshTokenOnAppMount,
} from "./auth-thunks";
import { UserRole } from "@/models/types/UserRole";
import { UserInfo } from "@/models/types/UserInfo";

//TO DO: Reorganise this file in the same format as jobs-slice
const initialState: {
  isLoading: boolean;
  userInfo: UserInfo | null;
  wasLastRefreshSuccessful: boolean | null;
  error: string | null;
  logoutCount: number;
} = {
  isLoading: true,
  userInfo: null,
  wasLastRefreshSuccessful: null,
  error: null,
  logoutCount: 0,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    reinitWasLastRefreshSuccessful(state) {
      state.wasLastRefreshSuccessful = null;
    },
    increaseLogoutCount(state) {
      state.logoutCount = state.logoutCount + 1;
    },
  },
  extraReducers(builder) {
    //Login user
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      setUserInfoFromLoggedInStatus(action, state);

      if (action.payload.error) {
        state.error = action.payload.error;
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log("login rejected, action.payload below ");
      console.log(action.payload);
      state.isLoading = false;
      state.error = action.payload;
    });
    //Logout user
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.isLoading = false;
      state.userInfo = null;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    //Get access token with refresh token in the background.
    //Do not change isLoading for any getAccessTokenWithRefreshToken case. The access token being updated should happen
    //invisibly and should not be reflected in the UI.
    builder.addCase(getAccessTokenWithRefreshToken.pending, (state) => {
      //Do not set isLoading.
      state.error = null;
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
        state.error = action.payload;
      }
    );
    //Send refresh token on app mount. In this case, we DO want to show the loading state
    builder.addCase(
      getAccessTokenWithRefreshTokenOnAppMount.pending,
      (state) => {
        state.isLoading = true;
        state.error = null;
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
        state.error = action.payload;
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

export const { reinitWasLastRefreshSuccessful, increaseLogoutCount } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectUserInfo = (state) => state.authSlice.userInfo;
export const selectLogoutCount = (state) => state.authSlice.logoutCount;
