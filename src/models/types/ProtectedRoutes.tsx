import { UserRole } from "./UserRole";

export type ProtectedRoutes = {
  [key: string]: {
    roles: UserRole[];
    children?: ProtectedRouteRolesByRoute[];
  };
};

export type ProtectedRouteRolesByRoute = {
  [key: string]: {
    roles: UserRole[];
  };
};

export type ProtectedRouteRoles = {
  roles: UserRole[];
};

export type ProtectedRouteChildren = {
  children: ProtectedRouteRolesByRoute[];
};

export type ProtectedRoute = ProtectedRouteChildren | ProtectedRouteRoles;

export type ProtectedRouteInfo = ProtectedRouteChildren | ProtectedRouteRoles;

export function isProtectedRouteChildren(
  protectedRouteInfo: ProtectedRouteInfo
): protectedRouteInfo is ProtectedRouteChildren {
  return (protectedRouteInfo as ProtectedRouteChildren).children !== undefined;
}
