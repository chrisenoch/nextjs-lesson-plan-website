export type UserRole = "ADMIN" | "USER";
export type UserRoles = UserRole[];

export function isSpecifiedUserRole(
  role: string,
  userRoles: UserRoles
): role is UserRole {
  return userRoles.includes(role as UserRole);
}
