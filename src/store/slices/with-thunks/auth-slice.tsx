import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  userLogout,
  getAccessTokenWithRefreshToken,
  getAccessTokenWithRefreshTokenOnAppMount,
} from "./auth-thunks";
import { UserRole } from "@/models/types/UserRole";
import { UserInfo } from "@/models/types/UserInfo";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "./thunk-helpers";

//TO DO: Reorganise this file in the same format as jobs-slice
const initialState: {
  isLoading: boolean;
  userInfo: UserInfo | null;
  wasLastRefreshSuccessful: boolean | null;
  error: string | null;
  logoutCount: number;

  userLogin: {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  };

  getAccessTokenWithRefreshToken: {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  };

  getAccessTokenWithRefreshTokenOnAppMount: {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  };
} = {
  isLoading: true,
  userInfo: null,
  wasLastRefreshSuccessful: null,
  error: null,
  logoutCount: 0,

  userLogin: {
    isError: false,
    isLoading: false,
    message: "",
    statusCode: null,
  },

  getAccessTokenWithRefreshToken: {
    isError: false,
    isLoading: false,
    message: "",
    statusCode: null,
  },

  getAccessTokenWithRefreshTokenOnAppMount: {
    isError: false,
    isLoading: true,
    message: "",
    statusCode: null,
  },
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
      handlePending("userLogin", state);
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      handleFulfilled("userLogin", state, action);
      setUserInfoFromLoggedInStatus(action, state);

      if (action.payload.isError) {
        state.userLogin.isError = action.payload.message;
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      handleRejected("userLogin", state, action);
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
      state.getAccessTokenWithRefreshToken.isError = false;
      state.getAccessTokenWithRefreshToken.message = "";
      state.getAccessTokenWithRefreshToken.statusCode = null;
      state.wasLastRefreshSuccessful = null;
    });
    builder.addCase(
      getAccessTokenWithRefreshToken.fulfilled,
      (state, action) => {
        //Do not set isLoading.
        handleFulfilled("getAccessTokenWithRefreshToken", state, action);
        handleRefreshState(action, state);

        if (action.payload.isError) {
          state.getAccessTokenWithRefreshToken.isError = true;
        } else {
          state.getAccessTokenWithRefreshToken.isError = false;
        }
      }
    );
    builder.addCase(
      getAccessTokenWithRefreshToken.rejected,
      (state, action) => {
        //Do not set isLoading.
        handleRejected("getAccessTokenWithRefreshToken", state, action);
      }
    );
    //Send refresh token on app mount. In this case, we DO want to show the loading state
    builder.addCase(
      getAccessTokenWithRefreshTokenOnAppMount.pending,
      (state) => {
        handlePending("getAccessTokenWithRefreshTokenOnAppMount", state);
        state.wasLastRefreshSuccessful = null;
      }
    );
    builder.addCase(
      getAccessTokenWithRefreshTokenOnAppMount.fulfilled,
      (state, action) => {
        handleFulfilled(
          "getAccessTokenWithRefreshTokenOnAppMount",
          state,
          action
        );
        handleRefreshState(action, state);
        if (action.payload.isError) {
          state.getAccessTokenWithRefreshToken.isError = true;
        } else {
          state.getAccessTokenWithRefreshToken.isError = false;
        }
      }
    );
    builder.addCase(
      getAccessTokenWithRefreshTokenOnAppMount.rejected,
      (state, action) => {
        handleRejected(
          "getAccessTokenWithRefreshTokenOnAppMount",
          state,
          action
        );
      }
    );
  },
});

function handleRefreshState(action, state) {
  if (action.payload.isLoggedIn) {
    const { message, status, isError, ...userInfo } = action.payload;
    state.userInfo = userInfo;
    state.wasLastRefreshSuccessful = true;
  } else {
    state.userInfo = null;
    state.wasLastRefreshSuccessful = false;
  }
}

function setUserInfoFromLoggedInStatus(action, state) {
  console.log("in setUserInfoFromLoggedInStatus");
  if (action.payload.isLoggedIn) {
    const { message, status, isError, ...userInfo } = action.payload;
    state.userInfo = userInfo;
  } else {
    state.userInfo = null;
  }
}

export const { reinitWasLastRefreshSuccessful, increaseLogoutCount } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectUserInfo = (state) => state.authSlice.userInfo;
export const selectLogoutCount = (state) => state.authSlice.logoutCount;
export const selectUserLogin = (state) => state.authSlice.userLogin;
export const selectGetAccessTokenWithRefreshTokenOnAppMount = (state) =>
  state.authSlice.getAccessTokenWithRefreshTokenOnAppMount;
