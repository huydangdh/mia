// UserAuthenticationService.ts

import { PERMISSION_CREATE_CLOCKRECORD, PERMISSION_READ_CLOCKRECORD } from "../PermissionsUtil"; 
import User from "./model/MMUser";

const users: User[] = [
  {
    id: "user123",
    username: "john_doe",
    password: "john@123",
    permissions: ["viewDashboard", "viewReports"],
  },
  {
    id: "admin456",
    username: "ad",
    password: "1",
    permissions: [
      PERMISSION_CREATE_CLOCKRECORD,
      PERMISSION_READ_CLOCKRECORD
    ],
  },
];

// Simulated user authentication function
export const login = (username: string, password: string): User | null => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
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
  localStorage.removeItem("userData");
};



// UserAuthorizationService.ts

// Abstract class for User Authorization Service
export abstract class IUserAuthorizationService {
  // Simulated user data
  protected users: User[];

  constructor() {
    this.users = [];
  }

  // Simulated user authentication function
  abstract login(username: string, password: string): User | null;

  // Simulated function to get user permissions
  abstract getUserPermissions(userId: string): string[];

  // Function to logout user
  logout(): void {
    // Perform any necessary cleanup or reset logic for logout
    // In this example, we simply clear the user data
    localStorage.removeItem("userData");
  }
}

