// src/components/usermanagement/useAuthorization.ts

import { useState, useEffect } from 'react';
import { authenticateUser as MESAuthService_CheckAuth, AuthData, performLogout as MESAuthService_Logout, isUserLoggedIn } from '../../services/auth';

interface UserAuthorizationHook {
  hasPermission: (permission: string) => boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  userData: AuthData;
}

const USER_DATA_KEY = 'userData';

export const useAuthorization = (): UserAuthorizationHook => {
  const [userData, setUserData] = useState<AuthData>(() => {
    const storedData = localStorage.getItem(USER_DATA_KEY);
    return storedData ? JSON.parse(storedData) : { userId: null, permissions: [] };
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isUserLoggedIn());

  useEffect(() => {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }, [userData]);

  // Function to check if the user has the specified permission
  const hasPermission = (permission: string): boolean => {
    return userData.permissions.includes(permission);
  };

  // Function to handle user login
  const login = async (username: string, password: string) => {
    const authData = await MESAuthService_CheckAuth(username, password);
    setUserData(authData);
    setIsLoggedIn(authData.userId !== null);
  };

  // Function to handle user logout
  const logout = () => {
    MESAuthService_Logout();
    setUserData({ userId: null, permissions: [] });
    setIsLoggedIn(false);
  };

  return { hasPermission, login, logout, isLoggedIn, userData };
};
