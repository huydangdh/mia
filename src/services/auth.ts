// import DefaultAuthService from "../services/userAuthService";
// import SupabaseUserAuthService from "../services/SupabaseUserAuthService";
// import User from "./model/MMUser";



// const authService = new DefaultAuthService();
// const supabaseAuthService = new SupabaseUserAuthService("https://gtjynrhgxnemxzyvdrsa.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0anlucmhneG5lbXh6eXZkcnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg0Mzg4MzcsImV4cCI6MTk5NDAxNDgzN30.Kjoe4qrCyfr2nEbZVaCd55GLmcw7pD-h-VjsJFoURF0");

// // Hàm thực hiện đăng nhập người dùng và lấy quyền
// export const authenticateUser = async (
//   username: string,
//   password: string
// ): Promise<AuthData> => {
//   try {
//     const user = await authService.emailPasswordLogin(username, password);
//     console.log("🚀 ~ file: auth.ts:11 ~ authenticateUser ~ user:", user);
//     if (user) {
//       const permissions = authService.getUserPermissions(user.id);
//       // Lưu dữ liệu người dùng vào localStorage
//       localStorage.setItem(
//         "userData",
//         JSON.stringify({ userId: user.id, permissions })
//       );
//       console.log("[I] userData đã được lưu");
//       return { userId: user.id, permissions };
//     } else {
//       return { userId: null, permissions: [] };
//     }
//   } catch (error) {
//     console.error("Lỗi khi xác thực người dùng:", error);
//     return { userId: null, permissions: [] };
//   }
// };

// // Hàm thực hiện đăng xuất người dùng
// export const performLogout = (): void => {
//   authService.logout();
// };

// // Hàm kiểm tra xem người dùng đã đăng nhập chưa
// export const isUserLoggedIn = (): boolean => {
//   // Kiểm tra xem có thông tin đăng nhập trong localStorage hay không
//   let userDataString = localStorage.getItem("userData");
//   console.log(userDataString);
//   if (userDataString == null) userDataString = "{}";
//   let authData = JSON.parse(userDataString) as AuthData;
//   if (authData.userId == null || userDataString == null) return false;
//   else return true;
// };

// // useAuthorization.js
// // (Tiếp tục viết code trong file useAuthorization.js)
