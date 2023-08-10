// BusinessLogic/AbstractUserAuthService.tsx
// BusinessLogic/AbstractUserAuthService.tsx

import User from '../model/MMUser';

abstract class AbstractUserAuthService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async emailPasswordLogin(email: string, password: string): Promise<User | null> {
    return this.handleEmailPasswordLogin(email, password);
  }

  async registerUser(username: string, email: string, password: string): Promise<User | null> {
    return this.handleRegisterUser(username, email, password);
  }

  async logout(): Promise<void> {
    return this.handleLogout();
  }

  isAuthenticated(): boolean {
    // Perform any necessary authentication check logic here (e.g., check session, token validity)
    return true; // For demo purposes, always return true
  }

  protected abstract handleEmailPasswordLogin(email: string, password: string): Promise<User | null>;

  protected abstract handleRegisterUser(username: string, email: string, password: string): Promise<User | null>;

  protected abstract handleLogout(): Promise<void>;
}

export default AbstractUserAuthService;

