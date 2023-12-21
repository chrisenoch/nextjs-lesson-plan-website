import { UserRole } from "./UserRole";

// const protectedRoutesExample: {
//   [key: string]: {
//     roles: string[];
//     children?: (
//       | {
//           [key: string]: {
//             roles: string[];
//           };
//         }
//       | {
//           [key: string]: {
//             roles: string[];
//           };
//         }
//     )[];
//   };
// } = {
//   lessonplans: { roles: ["USER"] },
//   premium: { roles: ["ADMIN", "USER"] },
//   users: {
//     roles: ["ADMIN", "USER"],
//     children: [
//       { account: { roles: ["USER"] } },
//       { "account/secrets": { roles: ["ADMIN"] } },
//     ],
//   },
//   shop: {
//     roles: ["ADMIN", "USER"],
//     children: [
//       { fashion: { roles: ["USER"] } },
//       { "fashion/secrets": { roles: ["ADMIN"] } },
//     ],
//   },
// };

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
