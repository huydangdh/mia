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
import { EPermissions } from "../../PermissionsUtil";
import SupabaseUserAuthService from "../../services/SupabaseUserAuthService";

interface UserAuthorizationHook {
  // Kiểm tra xem người dùng có quyền truy cập vào permission hay không
  hasPermission: (permission: string | string[]) => boolean;
  // Hàm xử lý đăng nhập người dùng
  login: (username: string, password: string, selectedProvider: string) => Promise<boolean>;
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
export const useAuthorization = (): UserAuthorizationHook => {
  // Khởi tạo userData từ localStorage hoặc set nó thành trạng thái rỗng
  const initialUserData: AuthData = JSON.parse(
    localStorage.getItem(USER_DATA_KEY) || '{"userId": null, "permissions": []}'
  );
  const [userData, setUserData] = useState<AuthData>(initialUserData);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  // Biến đánh dấu trạng thái loading
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Cập nhật trạng thái isLoggedIn khi userData thay đổi
    if (userData.userId !== null) {
      dispatch(setUser(userData));
    } else {
      dispatch(clearUser());
    }
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));

    // Đánh dấu trạng thái loading là false sau khi userData đã được đọc từ localStorage
    setLoading(false);
  }, [userData, dispatch]);

  // Hàm kiểm tra xem người dùng có quyền truy cập vào các permissions được chỉ định hay không
  const hasPermission = (permissions: string | string[]): boolean => {
    // Kiểm tra xem userData có tồn tại và có ít nhất một trong các permissions tồn tại trong mảng permissions
    if (userData && Array.isArray(permissions)) {
      return permissions.some((permission) =>
        userData.permissions.includes(permission)
      );
    } else if (userData && typeof permissions === "string") {
      return userData.permissions.includes(permissions);
    }

    return false;
  };

  // Hàm xử lý đăng nhập người dùng
  const login = async (
    username: string,
    password: string,
    selectedProvider: string // Pass selectedProvider as an arguments
  ): Promise<boolean> => {
    if (selectedProvider === "default") {
      const authData: AuthData = await MESAuthService_CheckAuth(
        username,
        password
      );

      if (authData.userId !== null) {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(authData));
        dispatch(setUser(authData));
        return true;
      }
    } else if (selectedProvider === "supabase") {
      // Implement Supabase login logic here
      // Example:
      // const success = await supabaseLogin(username, password);
      // if (success) {
      //   const authData: AuthData = {
      //     userId: username,
      //     permissions: [], // Add permissions as needed
      //   };
      //   localStorage.setItem(USER_DATA_KEY, JSON.stringify(authData));
      //   dispatch(setUser(authData));
      //   return true;
      // }
      let supabaseLogin = new SupabaseUserAuthService("https://gtjynrhgxnemxzyvdrsa.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0anlucmhneG5lbXh6eXZkcnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0Mzg4MzcsImV4cCI6MTk5NDAxNDgzN30.Kjoe4qrCyfr2nEbZVaCd55GLmcw7pD-h-VjsJFoURF0")
      let user = await supabaseLogin.emailPasswordLogin(username, password)
      console.log("LS -> src/components/usermanagement/UserAuthorization.tsx:105 -> user: ", user)
      if (user.id !== null) {
        let authData: AuthData = {
          userId: user.id,
          permissions: []
        }
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(authData));
        dispatch(setUser(authData));
        return true;

      }
    }

    return false; // Trả về false nếu đăng nhập không thành công
  };

  // Hàm xử lý đăng xuất người dùng
  const logout = (): void => {
    // Xóa thông tin userData khỏi localStorage khi đăng xuất
    localStorage.removeItem(USER_DATA_KEY);
    MESAuthService_Logout();
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
