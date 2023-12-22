export type UserRole = "ADMIN" | "USER";
//export type UserRoles = UserRole[];

export function isSpecifiedUserRole(
  role: string,
  userRoles: UserRole[]
): role is UserRole {
  return userRoles.includes(role as UserRole);
}
