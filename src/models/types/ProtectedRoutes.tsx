import { UserRole } from "./UserRole";

export type ProtectedRoutes = {
  [key: string]: {
    roles: UserRole[];
    children?: ProtectedRouteRolesByRoute[];
    notLoggedInRedirectUrlPath?: string;
  };
};

//only for secondary
//To do - change name and add notLoggedInRedirectUrlPath
//ProtectedRouteInfoBySecondaryRoute
export type ProtectedRouteRolesByRoute = {
  [key: string]: {
    roles: UserRole[];
    notLoggedInRedirectUrlPath?: string;
  };
  //notLoggedInRedirectUrlPath: string;
};

//To do - change to ProtectedPrimaryRouteInfo and add notLoggedInRedirectUrlPath
export type ProtectedRouteRoles = {
  roles: UserRole[];
  notLoggedInRedirectUrlPath?: string;
};

export type ProtectedRouteChildren = {
  children: ProtectedRouteRolesByRoute[];
  notLoggedInRedirectUrlPath?: string;
};

export type ProtectedRoute = ProtectedRouteChildren | ProtectedRouteRoles;

export type ProtectedRouteInfo = ProtectedRouteChildren | ProtectedRouteRoles;

export function isProtectedRouteChildren(
  protectedRouteInfo: ProtectedRouteInfo
): protectedRouteInfo is ProtectedRouteChildren {
  return (protectedRouteInfo as ProtectedRouteChildren).children !== undefined;
}
