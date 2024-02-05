import { UserRole } from "./UserRole";

type AuthPayloadOnError = {
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

export type UserInfo = Pick<
  Exclude<UserRefreshPayload, AuthPayloadOnError>,
  "email" | "exp" | "firstName" | "iat" | "id" | "role"
>;
