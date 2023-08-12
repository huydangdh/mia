import { AuthData } from '../model/MMUser';

abstract class AbstractUserAuthService {
  public providerName: string;


  constructor() {
  
  }

  // Phương thức xác thực người dùng bằng email và mật khẩu
  async emailPasswordLogin(email: string, password: string): Promise<AuthData | null> {
    return this.handleEmailPasswordLogin(email, password);
  }

  // Phương thức đăng ký người dùng mới
  async registerUser(username: string, email: string, password: string): Promise<AuthData | null> {
    return this.handleRegisterUser(username, email, password);
  }

  // Phương thức đăng xuất người dùng
  async logout(): Promise<void> {
    return this.handleLogout();
  }

  // Phương thức kiểm tra xem người dùng đã xác thực hay chưa
  isAuthenticated(): boolean {
    // Thực hiện bất kỳ logic kiểm tra xác thực cần thiết ở đây (ví dụ: kiểm tra phiên làm việc, tính hợp lệ của mã thông báo)
    return true; // Vì mục đích minh họa, luôn trả về true
  }

  // Phương thức xử lý xác thực người dùng bằng email và mật khẩu (phải được triển khai trong lớp con)
  protected abstract handleEmailPasswordLogin(email: string, password: string): Promise<AuthData | null>;

  // Phương thức xử lý đăng ký người dùng mới (phải được triển khai trong lớp con)
  protected abstract handleRegisterUser(username: string, email: string, password: string): Promise<AuthData | null>;

  // Phương thức xử lý đăng xuất người dùng (phải được triển khai trong lớp con)
  protected abstract handleLogout(): Promise<void>;
}

export default AbstractUserAuthService;
