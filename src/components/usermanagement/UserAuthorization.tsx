// useAuthorization.ts

import { useEffect, useState } from "react";
import {
  AuthData,
  authenticateUser,
  isUserLoggedIn,
  performLogout,
} from "../../services/auth";

export const Permissions = {
  VIEW_DASHBOARD: "viewDashboard",
  VIEW_REPORTS: "viewReports",
  MANAGE_USERS: "manageUsers",
};

interface UserAuthorizationHook {
  hasPermission: (permission: string) => boolean;
  loginAndFetchPermissions: (
    username: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
  user: AuthData
}

export const useAuthorization = (): UserAuthorizationHook => {
  const [userData, setUserData] = useState<AuthData>({
    userId: null,
    permissions: [],
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isUserLoggedIn());

  // Function to check if the user has the specified permission
  const hasPermission = (permission: string): boolean => {
    return userData.permissions.includes(permission);
  };

  // Function to handle user login and fetch permissions
  const loginAndFetchPermissions = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const authData = await authenticateUser(username, password);
      setUserData(authData);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      setIsLoggedIn(false);
      return false;
    }
  };
  // Function to handle user logout
  const logout = () => {
    performLogout();
    setUserData({ userId: null, permissions: [] });
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
    console.log("setIsLoggedIn")
  }, [userData]);

  return { hasPermission, loginAndFetchPermissions, logout, isLoggedIn, user: userData };
};
