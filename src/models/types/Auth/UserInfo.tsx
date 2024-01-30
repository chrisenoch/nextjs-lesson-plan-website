import { UserRole } from "./UserRole";

export type UserInfo = {
  email: string;
  exp: number;
  firstName: string;
  iat: number;
  id: string;
  role: UserRole;
};
