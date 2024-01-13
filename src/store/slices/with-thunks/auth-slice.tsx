import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  userLogout,
  getAccessTokenWithRefreshToken,
  getAccessTokenWithRefreshTokenOnAppMount,
} from "./auth-thunks";
import { UserInfo } from "@/models/types/UserInfo";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "./thunk-helpers";
import { LoginStatus } from "@/models/types/LoginStatus";

const initialState: {
  userInfo: UserInfo | null; //null is used when app mounts and the login attempt hasn't been processed yet.
  // We set isLoggedIn to true or false when a login attempt has been processed. This allows us to check for
  // isLoggedIn in hooks and components. If we set userInfo to null for when both user is logged-out and when
  // the login hasn't processed yet, it presents problems in hooks/components because it is possible that
  // first Userinfo is null (login not processed) and then userInfo is true (successful login).
  // isLoggedIn allows us to be certain that the login attempt was processed.
  loginStatus: LoginStatus;
  wasLastRefreshSuccessful: boolean | null;
  wasLastRefresh: boolean;
  logoutCount: number;

  userLogin: {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  };

  userLogout: {
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
  userInfo: null,
  loginStatus: "LOGIN_NOT_PROCESSED",
  wasLastRefreshSuccessful: null,
  wasLastRefresh: false,
  logoutCount: 0,

  userLogin: {
    isError: false,
    isLoading: false,
    message: "",
    statusCode: null,
  },

  userLogout: {
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
      state.loginStatus = "LOGGED_OUT";
    });
    //Logout user
    builder.addCase(userLogout.pending, (state) => {
      handlePending("userLogout", state);
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      handleFulfilled("userLogout", state, action);
      if (!action.payload.isError) {
        state.loginStatus = "LOGGED_OUT";
        state.userInfo = null;
      }
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      handleRejected("userLogout", state, action);
      //state.loginStatus = "LOGGED_OUT";
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
      state.wasLastRefresh = false;
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
        state.wasLastRefresh = false;
      }
    );
    //Send refresh token on app mount. In this case, we DO want to show the loading state
    builder.addCase(
      getAccessTokenWithRefreshTokenOnAppMount.pending,
      (state) => {
        handlePending("getAccessTokenWithRefreshTokenOnAppMount", state);
        state.wasLastRefreshSuccessful = null;
        state.wasLastRefresh = false;
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
        state.wasLastRefresh = false;
      }
    );
  },
});

function handleRefreshState(action, state) {
  if (!action.payload.isError) {
    const { message, status, isError, ...userInfo } = action.payload;
    state.userInfo = userInfo;
    state.loginStatus = "LOGGED_IN";
    state.wasLastRefreshSuccessful = true;

    if (action.payload.wasLastRefresh) {
      state.wasLastRefresh = true;
    } else {
      state.wasLastRefresh = false;
    }
  } else {
    state.userInfo = null;
    state.loginStatus = "LOGGED_OUT";
    state.wasLastRefreshSuccessful = false;
    state.wasLastRefresh = false;
  }
}

function setUserInfoFromLoggedInStatus(action, state) {
  console.log("in setUserInfoFromLoggedInStatus");
  if (!action.payload.isError) {
    const { message, status, isError, ...userInfo } = action.payload;
    state.userInfo = userInfo;
    state.loginStatus = "LOGGED_IN";
    state.wasLastRefreshSuccessful = null;
  } else {
    state.loginStatus = "LOGGED_OUT";
  }
}

export const { reinitWasLastRefreshSuccessful, increaseLogoutCount } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectUserInfo = (state) => state.authSlice.userInfo;
export const selectLoginStatus = (state) => state.authSlice.loginStatus;
export const selectLogoutCount = (state) => state.authSlice.logoutCount;
export const selectUserLogin = (state) => state.authSlice.userLogin;
export const selectGetAccessTokenWithRefreshTokenOnAppMount = (state) =>
  state.authSlice.getAccessTokenWithRefreshTokenOnAppMount;
