// src/utils/permissionUtils.ts

import { useAuthorization } from "./components/usermanagement/UserAuthorization";
import { AuthData } from "./services/auth";

// src/permissions.ts

export const PERMISSION_CREATE_CLOCKRECORD = "PERMISSION_CREATE_CLOCKRECORD";
export const PERMISSION_READ_CLOCKRECORD = "PERMISSION_READ_CLOCKRECORD";
// Add more permissions as needed


// Utility function to check if the user has any of the specified permissions
export const hasPermission = (permissions: string | string[], userData: AuthData): boolean => {
  // Check if userData is available and at least one of the permissions exists in the permissions array
  if (userData && Array.isArray(permissions)) {
    return permissions.some((permission) => userData.permissions.includes(permission));
  } else if (userData && typeof permissions === "string") {
    return userData.permissions.includes(permissions);
  }

  return false;
};
