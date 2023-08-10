import UserAuthService from "../services/userAuthService";

export interface AuthData {
  userId: string | null;
  permissions: string[];
}

const authService = new UserAuthService();

// Hàm thực hiện đăng nhập người dùng và lấy quyền
export const authenticateUser = async (
  username: string,
  password: string
): Promise<AuthData> => {
  try {
    const user = await authService.emailPasswordLogin(username, password);
    console.log("🚀 ~ file: auth.ts:11 ~ authenticateUser ~ user:", user);
    if (user) {
      const permissions = authService.getUserPermissions(user.id);
      // Lưu dữ liệu người dùng vào localStorage
      localStorage.setItem(
        "userData",
        JSON.stringify({ userId: user.id, permissions })
      );
      console.log("[I] userData đã được lưu");
      return { userId: user.id, permissions };
    } else {
      return { userId: null, permissions: [] };
    }
  } catch (error) {
    console.error("Lỗi khi xác thực người dùng:", error);
    return { userId: null, permissions: [] };
  }
};

// Hàm thực hiện đăng xuất người dùng
export const performLogout = (): void => {
  authService.logout();
};

// Hàm kiểm tra xem người dùng đã đăng nhập chưa
export const isUserLoggedIn = (): boolean => {
  // Kiểm tra xem có thông tin đăng nhập trong localStorage hay không
  let userDataString = localStorage.getItem("userData");
  console.log(userDataString);
  if (userDataString == null) userDataString = "{}";
  let authData = JSON.parse(userDataString) as AuthData;
  if (authData.userId == null || userDataString == null) return false;
  else return true;
};

// useAuthorization.js
// (Tiếp tục viết code trong file useAuthorization.js)
