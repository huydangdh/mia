import { login, getUserPermissions, logout } from '../services/userService'
export interface AuthData {
  userId: string | null;
  permissions: string[];
}

// Function to perform user login and fetch permissions
export const authenticateUser = async (username: string, password: string): Promise<AuthData> => {
  try {
    const user = login(username, password);
    console.log(user)
    if (user) {
      const permissions = getUserPermissions(user.id);
      // Save user data to localStorage
      localStorage.setItem('userData', JSON.stringify({ userId: user.id, permissions }));
      console.log("[I] userData saved",)
      return { userId: user.id, permissions };
    } else {
      return { userId: null, permissions: [] };
    }
  } catch (error) {
    console.error('Error while authenticating user:', error);
    return { userId: null, permissions: [] };
  }
};

// Function to perform user logout
export const performLogout = (): void => {
  logout();
};


// Function to check if the user is logged in
export const isUserLoggedIn = (): boolean => {
  // Kiểm tra xem có thông tin đăng nhập trong localStorage hay không
  let userDataString = localStorage.getItem('userData');
  console.log(userDataString)
  return !!userDataString; // Trả về true nếu có thông tin đăng nhập, ngược lại trả về false
};

// useAuthorization.js


