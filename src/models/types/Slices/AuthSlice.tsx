import { LoginStatus } from "../Auth/LoginStatus";
import { UserInfo } from "../Auth/UserInfo";
import { StandardResponseInfo } from "../DataFetching/StandardResponseInfo";

export type AuthSliceState = {
  userInfo: UserInfo | null;
  loginStatus: LoginStatus;
  wasLastRefreshSuccessful: boolean | null;
  wasLastRefresh: boolean;
  logoutCount: number;
  userLogin: StandardResponseInfo;
  userLogout: StandardResponseInfo;
  getAccessTokenWithRefreshToken: StandardResponseInfo;
  getAccessTokenWithRefreshTokenOnAppMount: StandardResponseInfo;
};
