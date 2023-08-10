import { PERMISSION_CREATE_CLOCKRECORD, PERMISSION_READ_CLOCKRECORD } from '../PermissionsUtil';
import AbstractUserAuthService from './interface/AbstractUserAuthService';
import User from './model/MMUser';

const usersData: User[] = [
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

class UserAuthService extends AbstractUserAuthService {
  constructor() {
    super();
  }

  private findUserByEmail(email: string): User | undefined {
    return usersData.find((user) => user.username === email);
  }

  protected async handleEmailPasswordLogin(email: string, password: string): Promise<User | null> {
    const user = this.findUserByEmail(email);

    if (user && user.password === password) {
      // Password matches, return the authenticated user
      return user;
    } else {
      // Invalid credentials, return null to indicate login failure
      return null;
    }
  }

  protected async handleRegisterUser(username: string, email: string, password: string): Promise<User | null> {
    // Check if a user with the email already exists
    if (this.findUserByEmail(email)) {
      return null; // User with this email already exists
    }

    // Generate a new user ID in the format "TW{auto_increment_XXXXXX}"
    const id = this.generateUniqueUserId();

    // Create a new user
    const newUser: User = {
      id,
      username,
      email,
      password,
      permissions: [], // Initialize with an empty array of permissions
    };
    usersData.push(newUser);

    return newUser;
  }

  // Helper function to generate a new unique user ID in the format "TW{auto_increment_XXXXXX}"
  private generateUniqueUserId(): string {
    // For simplicity, let's use a simple incrementing counter
    const nextId = usersData.length + 1;
    return `TW${nextId.toString().padStart(6, '0')}`;
  }


  protected async handleLogout(): Promise<void> {
    // Since this is a demo, we don't need to perform any specific logout actions
    // For a real implementation, you might want to clear user sessions or tokens
    return;
  }

  // Simulated function to get user permissions
  public getUserPermissions = (userId: string): string[] => {
    const user = usersData.find((u) => u.id === userId);
    return user ? user.permissions : [];
  };

}

export default UserAuthService;

