import { AuthPayloadOnError, UserRefreshPayload } from "./AuthPayloads";

export type UserSession = Pick<
  Exclude<UserRefreshPayload, AuthPayloadOnError>,
  "email" | "exp" | "firstName" | "iat" | "id" | "role"
>;
