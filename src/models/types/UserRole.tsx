const userRoles = ["ADMIN", "USER"] as const;
//We need one source of truth for user roles because of the isSpecifiedUserRole type predicate.
export type UserRole = (typeof userRoles)[number]; //See: //www.reddit.com/r/typescript/comments/n1iiyp/defining_an_array_type_that_contains_all_types_in/

export function isUserRole(role: string): role is UserRole {
  return userRoles.includes(role as UserRole);
}

export const fruits = ["apple", "banana", "orange"] as const;
export type Fruit = (typeof fruits)[number];
