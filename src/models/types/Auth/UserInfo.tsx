import { AuthPayloadOnError, UserRefreshPayload } from "./AuthPayloads";

export type UserInfo = Pick<
  Exclude<UserRefreshPayload, AuthPayloadOnError>,
  "email" | "exp" | "firstName" | "iat" | "id" | "role"
>;
