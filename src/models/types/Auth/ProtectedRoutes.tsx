import { UserRole } from "./UserRole";

export type ProtectedRoutes = {
  [key: string]: {
    roles: UserRole[];
    children?: ProtectedRouteInfoNoChildrenBySecondaryRoute[];
    notLoggedInRedirectUrlPath?: string;
    incorrectRoleRedirectUrlPath?: string;
  };
};

export type ProtectedRouteInfoNoChildrenBySecondaryRoute = {
  [key: string]: {
    roles: UserRole[];
    notLoggedInRedirectUrlPath?: string;
    incorrectRoleRedirectUrlPath?: string;
  };
};

export type ProtectedRouteInfoNoChildren = {
  roles: UserRole[];
  notLoggedInRedirectUrlPath?: string;
  incorrectRoleRedirectUrlPath?: string;
};

export type ProtectedSecondaryRouteInfo = {
  children: ProtectedRouteInfoNoChildrenBySecondaryRoute[];
  notLoggedInRedirectUrlPath?: string;
  incorrectRoleRedirectUrlPath?: string;
};

export type ProtectedRouteInfo =
  | ProtectedSecondaryRouteInfo
  | ProtectedRouteInfoNoChildren;

export function isProtectedRouteChildren(
  protectedRouteInfo: ProtectedRouteInfo
): protectedRouteInfo is ProtectedSecondaryRouteInfo {
  return (
    (protectedRouteInfo as ProtectedSecondaryRouteInfo).children !== undefined
  );
}
