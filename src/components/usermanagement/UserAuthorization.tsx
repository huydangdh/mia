// src/components/usermanagement/useAuthorization.ts

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateUser as MESAuthService_CheckAuth,
  AuthData,
  performLogout as MESAuthService_Logout,
} from "../../services/auth";
import { setUser, clearUser } from "../../redux/userSlice";
import IApp from "../common/IApp";

interface UserAuthorizationHook {
  hasPermission: (permission: string) => boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  userData: AuthData;
  loading: boolean;
  getAppsByPermission: (apps: IApp[], permissions: string[]) => IApp[];
}

const USER_DATA_KEY = "userData";

// Hook to manage user authorization and authentication
export const useAuthorization = (): UserAuthorizationHook => {
  // Initialize userData from localStorage or set it to an empty state
  const initialUserData: AuthData = JSON.parse(
    localStorage.getItem(USER_DATA_KEY) || '{"userId": null, "permissions": []}'
  );
  const [userData, setUserData] = useState<AuthData>(initialUserData);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  // Variable to indicate if the hook is loading
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Update the isLoggedIn status when userData changes
    if (userData.userId !== null) {
      dispatch(setUser(userData));
    } else {
      dispatch(clearUser());
    }
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

    // Mark the loading state as false once userData has been read from localStorage
    setLoading(false);
  }, [userData, dispatch]);

  // Function to check if the user has the specified permission
  const hasPermission = (permission: string): boolean => {
    return userData.permissions.includes(permission);
  };

  // Function to handle user login
  const login = async (username: string, password: string): Promise<void> => {
    const authData: AuthData = await MESAuthService_CheckAuth(
      username,
      password
    );
    // Save the user data to localStorage on successful login
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(authData));
    dispatch(setUser(authData));
  };

  // Function to handle user logout
  const logout = (): void => {
    // Clear userData from localStorage on logout
    localStorage.removeItem(USER_DATA_KEY);
    MESAuthService_Logout();
    dispatch(clearUser());
  };

  // Function to get apps filtered by user permissions
  const getAppsByPermission = (apps: IApp[], permissions: string[]): IApp[] => {
    // Filter the list of apps based on the user's permissions
    return apps.filter((app) =>
      permissions.some((permission) => app.permissions.includes(permission))
    );
  };

  return {
    hasPermission,
    login,
    logout,
    isLoggedIn,
    userData,
    loading,
    getAppsByPermission,
  };
};
