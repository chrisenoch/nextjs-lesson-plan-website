import { UserRole } from "./UserRole";

// const protectedRoutes: ProtectedRoutes = {
//   lessonplans: { roles: ["USER"] },
//   premium: { roles: ["ADMIN", "USER"] },
//   users: {
//     children: [
//       { account: { roles: ["USER"] } },
//       { "account/statistics": { roles: ["ADMIN"] } },
//     ],
//   },
// };

export type ProtectedRoutes = {
  [key: string]: ProtectedRoute;
};

//need a type for this below:

// {
//   "account": {
//     "roles": [
//       "USER"
//     ]
//   }
// }

export type ProtectedRouteRolesByRoute = {
  [key: string]: {
    roles: ["USER"];
  };
};

export type ProtectedRoute = ProtectedRouteChildren | ProtectedRouteRoles;

export type ProtectedRouteChildren = {
  children: {
    [key: string]: {
      roles: UserRole[];
    };
  }[];
};

export type ProtectedRouteRoles = {
  roles: UserRole[];
};

export type ProtectedRouteInfo = ProtectedRouteChildren | ProtectedRouteRoles;

export function isProtectedRouteChildren(
  protectedRouteInfo: ProtectedRouteInfo
): protectedRouteInfo is ProtectedRouteChildren {
  return (protectedRouteInfo as ProtectedRouteChildren).children !== undefined;
}
