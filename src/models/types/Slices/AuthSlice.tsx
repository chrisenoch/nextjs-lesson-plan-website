import { LoginStatus } from "../Auth/LoginStatus";
import { UserSession } from "../Auth/UserSession";
import { StandardResponseInfo } from "../DataFetching/StandardResponseInfo";

export type AuthSliceState = {
  userSession: UserSession | null;
  loginStatus: LoginStatus;
  wasLastRefreshSuccessful: boolean | null;
  wasLastRefresh: boolean;
  logoutCount: number;
  userLogin: StandardResponseInfo;
  userLogout: StandardResponseInfo;
  getAccessTokenWithRefreshToken: StandardResponseInfo;
  getAccessTokenWithRefreshTokenOnAppMount: StandardResponseInfo;
};
