import { UserSession } from "../Auth/UserSession";
import { StandardResponseInfo } from "../DataFetching/StandardResponseInfo";

export type AuthSliceState = {
  userSession: UserSession;
  wasLastRefreshSuccessful: "SUCCESS" | "FAILURE" | "CLEAN";
  wasLastRefresh: boolean;
  logoutCount: number;
  userLogin: StandardResponseInfo;
  userLogout: StandardResponseInfo;
  getAccessTokenWithRefreshToken: StandardResponseInfo;
  getAccessTokenWithRefreshTokenOnAppMount: StandardResponseInfo;
};
