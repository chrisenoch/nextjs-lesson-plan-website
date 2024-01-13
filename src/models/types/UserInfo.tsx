import { UserRole } from "./UserRole";

export type UserInfo =
  | {
      isLoggedIn: true;
      email: string;
      exp: number;
      firstName: string;
      iat: number;
      id: string;
      role: UserRole;
    }
  | {
      isLoggedIn: false;
    };
