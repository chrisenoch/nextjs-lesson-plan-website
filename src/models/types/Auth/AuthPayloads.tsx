import { UserRole } from "./UserRole";

export type AuthPayloadOnError = {
  message: string;
  isError: true;
};

type UserRefreshPayloadOnSuccess = {
  id: string;
  firstName: string;
  email: string;
  role: UserRole;
  exp: number;
  iat: number;
  wasLastRefresh: boolean;
  message: string;
  isError: false;
  status: number;
};

export type UserRefreshPayload =
  | UserRefreshPayloadOnSuccess
  | AuthPayloadOnError;

type UserLoginPayloadOnSuccess = Omit<
  UserRefreshPayloadOnSuccess,
  "wasLastRefresh"
>;

export type UserLoginPayload = UserLoginPayloadOnSuccess | AuthPayloadOnError;
