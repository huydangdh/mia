// UserAuthenticationService.ts

// Simulated user data
interface User {
  id: string;
  username: string;
  password: string;
  permissions: string[];
}

const users: User[] = [
  {
    id: 'user123',
    username: 'john_doe',
    password: 'john@123',
    permissions: ['viewDashboard', 'viewReports'],
  },
  {
    id: 'admin456',
    username: 'ad',
    password: '1',
    permissions: ['viewDashboard', 'viewReports', 'manageUsers'],
  },
];

// Simulated user authentication function
export const login = (username: string, password: string): User | null => {
  const user = users.find((u) => u.username === username && u.password === password);
  return user ? user : null;
};

// Simulated function to get user permissions
export const getUserPermissions = (userId: string): string[] => {
  const user = users.find((u) => u.id === userId);
  return user ? user.permissions : [];
};


// Function to logout user
export const logout = (): void => {
  // Perform any necessary cleanup or reset logic for logout
  // In this example, we simply clear the user data
  localStorage.removeItem('userData');
};
