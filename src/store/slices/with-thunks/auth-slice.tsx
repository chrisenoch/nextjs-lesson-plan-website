import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  userLogin,
  userLogout,
  getAccessTokenWithRefreshToken,
  getAccessTokenWithRefreshTokenOnAppMount,
} from "./auth-thunks";
import { UserSession } from "@/models/types/Auth/UserSession";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from "./thunk-helpers";
import { StandardResponseInfo } from "@/models/types/DataFetching/StandardResponseInfo";
import { AuthSliceState } from "@/models/types/Slices/AuthSlice";
import { RootState } from "@/store";
import {
  UserLoginPayload,
  UserRefreshPayload,
} from "@/models/types/Auth/AuthPayloads";

const initialState: {
  userSession: UserSession;
  refreshSuccessStatus: "SUCCESS" | "DENIED" | "CLEAN"; //Clean is for when there hasn't been a refresh yet in the current user session.
  wasLastRefresh: boolean;
  logoutCount: number;
  userLogin: StandardResponseInfo;
  userLogout: StandardResponseInfo;
  getAccessTokenWithRefreshToken: StandardResponseInfo;
  getAccessTokenWithRefreshTokenOnAppMount: StandardResponseInfo;
} = {
  userSession: { status: "PROCESSING" },
  refreshSuccessStatus: "CLEAN",
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
      setUserSessionFromLoggedInStatus(action, state);

      if (action.payload.isError) {
        state.userLogin.isError = action.payload.message;
      }
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      handleRejected("userLogin", state, action);
      //Don't set userSessionStatus to "INACTIVE" here. We only need to set the session to inactive if the user is logged-in
      //If we get here, it means that the user has tried to log-in and so the session should already be inactive.
      //In the unlikely case, that the user is logggd-in,
      //the login form is incorrectly showing for logged-in users, the user tries to login again, and then subsequently the network request fails,
      //the user's existing access token would still be valid.
    });
    //Logout user
    builder.addCase(userLogout.pending, (state) => {
      state.refreshSuccessStatus = "CLEAN";
      handlePending("userLogout", state);
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.refreshSuccessStatus = "CLEAN";
      handleFulfilled("userLogout", state, action);
      if (!action.payload.isError) {
        state.userSession = { status: "INACTIVE" };
        state.wasLastRefresh = false;
      }
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.refreshSuccessStatus = "CLEAN";
      handleRejected("userLogout", state, action); //Don't set userSession to null here and don't set loginStatus to LOGGED_OUT. If the logout fails, the UI should not tell the user that he has logged-out.
    });
    //Get access token with refresh token in the background.
    //Do not change isLoading for any getAccessTokenWithRefreshToken case. The access token being updated should happen
    //invisibly and should not be reflected in the UI.
    builder.addCase(getAccessTokenWithRefreshToken.pending, (state) => {
      //Do not set isLoading.
      state.getAccessTokenWithRefreshToken.isError = false;
      state.getAccessTokenWithRefreshToken.message = "";
      state.getAccessTokenWithRefreshToken.statusCode = null;
      state.refreshSuccessStatus = "CLEAN";
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
        state.refreshSuccessStatus = "CLEAN";
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
          state.getAccessTokenWithRefreshTokenOnAppMount.isError = true;
        } else {
          state.getAccessTokenWithRefreshTokenOnAppMount.isError = false;
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

function handleRefreshState(
  action: PayloadAction<UserRefreshPayload>,
  state: AuthSliceState
) {
  if (!action.payload.isError) {
    const { id, email, firstName, iat, exp, role } = action.payload;
    state.userSession = {
      id,
      email,
      firstName,
      iat,
      exp,
      role,
      status: "ACTIVE",
    };
    state.refreshSuccessStatus = "SUCCESS";

    if (action.payload.wasLastRefresh) {
      state.wasLastRefresh = true;
    } else {
      state.wasLastRefresh = false;
    }
  } else {
    state.userSession = { status: "INACTIVE" };
    state.refreshSuccessStatus = "DENIED";
    state.wasLastRefresh = false;
  }
}

function setUserSessionFromLoggedInStatus(
  action: PayloadAction<UserLoginPayload>,
  state: AuthSliceState
) {
  if (!action.payload.isError) {
    const { id, email, firstName, iat, exp, role } = action.payload;
    state.userSession = {
      id,
      email,
      firstName,
      iat,
      exp,
      role,
      status: "ACTIVE",
    };
    state.refreshSuccessStatus = "CLEAN";
    state.wasLastRefresh = false;
  } else {
    state.userSession = { status: "INACTIVE" };
  }
}

export const { increaseLogoutCount } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectUserSession = (state: RootState) =>
  state.authSlice.userSession;
export const selectUserSessionStatus = (state: RootState) =>
  state.authSlice.userSession.status;
export const selectLogoutCount = (state: RootState) =>
  state.authSlice.logoutCount;
export const selectUserLogin = (state: RootState) => state.authSlice.userLogin;
export const selectGetAccessTokenWithRefreshTokenOnAppMount = (
  state: RootState
) => state.authSlice.getAccessTokenWithRefreshTokenOnAppMount;
