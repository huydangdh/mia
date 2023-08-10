// UserAuthService.test.ts

import UserAuthService from '../services/userAuthService';

describe('UserAuthService', () => {
  let authService: UserAuthService;

  beforeEach(() => {
    authService = new UserAuthService();
  });

  it('should login with valid credentials', async () => {
    const email = 'john@example.com';
    const password = 'hashed_password_1';

    const user = await authService.emailPasswordLogin(email, password);

    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
  });

  it('should not login with invalid credentials', async () => {
    const email = 'john@example.com';
    const password = 'invalid_password';

    const user = await authService.emailPasswordLogin(email, password);

    expect(user).toBeNull();
  });

  it('should register a new user', async () => {
    const username = 'new_user';
    const email = 'new_user@example.com';
    const password = 'new_password';

    const newUser = await authService.registerUser(username, email, password);

    expect(newUser).toBeDefined();
    expect(newUser?.id).toBeGreaterThan(0);
    expect(newUser?.username).toBe(username);
    expect(newUser?.email).toBe(email);
  });

  it('should not register a user with an existing email', async () => {
    const username = 'existing_user';
    const email = 'john@example.com';
    const password = 'existing_password';

    const newUser = await authService.registerUser(username, email, password);

    expect(newUser).toBeNull();
  });

  it('should perform logout', async () => {
    // Since logout doesn't return anything, we can simply test if it doesn't throw an error
    await expect(authService.logout()).resolves.not.toThrow();
  });
});

