export type UserRole = "ADMIN" | "USER";

export function isSpecifiedUserRole(
  role: string,
  userRoles: UserRole[]
): role is UserRole {
  return userRoles.includes(role as UserRole);
}
