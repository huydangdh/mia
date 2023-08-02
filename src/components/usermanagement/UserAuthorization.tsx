// src/components/usermanagement/useAuthorization.ts

import { useState, useEffect } from "react";
import {
  authenticateUser as MESAuthService_CheckAuth,
  AuthData,
  performLogout as MESAuthService_Logout,
  isUserLoggedIn,
} from "../../services/auth";

//add redux
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../../redux/userSlice";
// end add redux

interface UserAuthorizationHook {
  hasPermission: (permission: string) => boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  userData: AuthData;
}

const USER_DATA_KEY = "userData";

export const useAuthorization = (): UserAuthorizationHook => {
  // Khởi tạo userData từ localStorage
  const initialUserData: AuthData = JSON.parse(
    localStorage.getItem(USER_DATA_KEY) || '{"userId": null, "permissions": []}'
  );

  const [userData, setUserData] = useState<AuthData>(initialUserData);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    // Cập nhật biến isLoggedIn khi có dữ liệu userData
    if (userData.userId !== null) {
      dispatch(setUser(userData));
    } else {
      dispatch(clearUser());
    }
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }, []);

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
    // Lưu trạng thái người dùng vào localStorage khi đăng nhập thành công
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(authData));
    dispatch(setUser(authData));
  };

  // Function to handle user logout
  const logout = (): void => {
    MESAuthService_Logout();
    dispatch(clearUser());
  };

  return { hasPermission, login, logout, isLoggedIn, userData };
};
