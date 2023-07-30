// useAuthorization.ts

import { useState, useEffect } from 'react';
import { authenticateUser, AuthData, performLogout, isUserLoggedIn } from '../../services/auth';

interface UserAuthorizationHook {
  hasPermission: (permission: string) => boolean;
  loginAndFetchPermissions: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

export const useAuthorization = (): UserAuthorizationHook => {
  const [userData, setUserData] = useState<AuthData>({ userId: null, permissions: [] });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isUserLoggedIn());

  // Function to check if the user has the specified permission
  const hasPermission = (permission: string): boolean => {
    return userData.permissions.includes(permission);
  };

  // Function to handle user login and fetch permissions
  const loginAndFetchPermissions = async (username: string, password: string) => {
    const authData = await authenticateUser(username, password);
    setUserData(authData);
    setIsLoggedIn(authData.userId !== null);
  };

  // Function to handle user logout
  const logout = () => {
    performLogout();
    setUserData({ userId: null, permissions: [] });
    setIsLoggedIn(false);
  };

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  }, [userData]);

  return { hasPermission, loginAndFetchPermissions, logout, isLoggedIn };
};

