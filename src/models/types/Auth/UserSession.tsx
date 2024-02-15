import { ValueOf } from "../TypeScriptHelpers/ValueOf";

export type UserSession =
  | {
      email: string;
      exp: number;
      firstName: string;
      iat: number;
      id: string;
      role: "EVERYBODY" | "USER" | "ADMIN";
      status: "ACTIVE";
    }
  | {
      status: "INACTIVE";
    }
  | {
      status: "PROCESSING";
    };

type UserSessionStatusHelper = Pick<UserSession, "status">;
export type UserSessionStatus = ValueOf<UserSessionStatusHelper>;
