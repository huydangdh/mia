// src/components/usermanagement/useAuthorization.ts

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../../redux/userSlice";
import IApp from "../common/IApp";
import { EPermissions } from "../../PermissionsUtil";
import AbstractUserAuthService from "../../services/interface/AbstractUserAuthService";
import { AuthData } from "../../services/model/MMUser";

interface UserAuthorizationHook {
  // Kiểm tra xem người dùng có quyền truy cập vào permission hay không
  hasPermission: (permission: string | string[]) => boolean;
  // Hàm xử lý đăng nhập người dùng
  login: (username: string, password: string) => Promise<AuthData>;
  // Hàm xử lý đăng xuất người dùng
  logout: () => void;
  // Trạng thái người dùng đã đăng nhập hay chưa
  isLoggedIn: boolean;
  // Thông tin người dùng
  userData: AuthData;
  // Biến đánh dấu trạng thái loading của hook
  loading: boolean;
  // Hàm lấy danh sách các ứng dụng được phân quyền dựa trên danh sách permissions
  getAppsByPermission: (apps: IApp[], permissions: string[]) => IApp[];
}

const USER_DATA_KEY = "userData";

// Hook quản lý xác thực và phân quyền người dùng
export const useAuthorization = (
  authService: AbstractUserAuthService
): UserAuthorizationHook => {
  // Khởi tạo userData từ localStorage hoặc set nó thành trạng thái rỗng
  const initialUserData: AuthData = JSON.parse(
    localStorage.getItem(USER_DATA_KEY) ||
      `{
      "user": {
        "id": null
      }
    }`
  );
  const [userData, setUserData] = useState<AuthData>(initialUserData);
  console.log("🚀 ~ file: UserAuthorization.tsx:39 ~ userData:", userData);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  // Biến đánh dấu trạng thái loading
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (authService === null) {
      localStorage.clear();
      // Đánh dấu trạng thái loading là false sau khi userData đã được đọc từ localStorage
      setLoading(false);
    }
  });

  useEffect(() => {
    // Cập nhật trạng thái isLoggedIn khi userData thay đổi
    if (userData.user.id !== null) {
      dispatch(setUser(userData));
    } else {
      dispatch(clearUser());
    }
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

    // Đánh dấu trạng thái loading là false sau khi userData đã được đọc từ localStorage
    setLoading(false);
  }, [userData, dispatch]);

  // Hàm kiểm tra xem người dùng có quyền truy cập vào các permissions được chỉ định hay không
  const hasPermission = (permissions: EPermissions[]): boolean => {
    // Kiểm tra xem userData có tồn tại và có ít nhất một trong các permissions tồn tại trong mảng permissions
    if (userData && Array.isArray(permissions)) {
      return permissions.some((permission) =>
        userData.user.permissions.includes(permission)
      );
    } else if (userData && typeof permissions === "string") {
      return userData.user.permissions.includes(permissions);
    }

    return false;
  };

  // Hàm xử lý đăng nhập người dùng
  const login = async (
    username: string,
    password: string
  ): Promise<AuthData> => {
    const authData: AuthData = await authService.emailPasswordLogin(
      username,
      password
    );

    if (authData.user.id !== null) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(authData));
      dispatch(setUser(authData));
    }
    return authData;
  };

  // Hàm xử lý đăng xuất người dùng
  const logout = async (): Promise<void> => {
    // Xóa thông tin userData khỏi localStorage khi đăng xuất
    localStorage.removeItem(USER_DATA_KEY);
    await authService.logout();
    dispatch(clearUser());
  };

  // Hàm lấy danh sách ứng dụng dựa trên permissions người dùng
  const getAppsByPermission = (
    apps: IApp[],
    permissions: EPermissions[]
  ): IApp[] => {
    // Lọc danh sách apps dựa trên permissions của người dùng
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
