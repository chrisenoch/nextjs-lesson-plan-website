import { AuthPayloadOnError, UserRefreshPayload } from "./AuthPayloads";

export type UserSession =
  | {
      email: string;
      exp: number;
      firstName: string;
      iat: number;
      id: string;
      role: "EVERYBODY" | "USER" | "ADMIN";
      isActive: true;
    }
  | {
      isActive: false;
    };
