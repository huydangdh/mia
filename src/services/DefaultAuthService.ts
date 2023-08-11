import {
  PERMISSION_CREATE_CLOCKRECORD,
  PERMISSION_READ_CLOCKRECORD,
  EPermissions,
} from "../PermissionsUtil";
import AbstractUserAuthService from "./interface/AbstractUserAuthService";
import { AuthData, User } from "./model/MMUser";

// Danh sách người dùng mẫu để minh họa
const usersData: User[] = [
  {
    id: "user123",
    username: "user",
    password: "1",
    permissions: [EPermissions.VIEW_DASHBOARD, EPermissions.CREATE_CLOCKRECORD],
  },
  {
    id: "admin456",
    username: "ad",
    password: "1",
    permissions: [
      EPermissions.VIEW_CLOCKRECORD,
      EPermissions.READ_CLOCKRECORD,
      EPermissions.CREATE_CLOCKRECORD,
    ],
  },
];

class DefaultAuthService extends AbstractUserAuthService {
  constructor() {
    super();
  }

  // Tìm người dùng bằng email trong danh sách người dùng
  private findUserByEmail(email: string): User | undefined {
    return usersData.find((user) => user.username === email);
  }

  /**
   * Xử lý xác thực người dùng bằng email và mật khẩu.
   * @param email - Địa chỉ email người dùng.
   * @param password - Mật khẩu người dùng.
   * @returns {Promise<User | null>} - Thông tin người dùng đã xác thực hoặc null nếu đăng nhập thất bại.
   */
  protected async handleEmailPasswordLogin(
    email: string,
    password: string
  ): Promise<AuthData | null> {
    let _authData: AuthData = {
      user: {
        id: null,
        username: null,
        email: null,
        permissions: [],
      },
      accessToken: "NULL",
    };
    const user = this.findUserByEmail(email);
    if (user && user.password === password) {
      // Mật khẩu khớp, trả về người dùng đã xác thực
      _authData = {
        user: user,
        accessToken: "NULL",
      };
      return _authData;
    } else {
      // Thông tin đăng nhập không hợp lệ, trả về null để chỉ thị đăng nhập thất bại
      return _authData;
    }
  }

  /**
   * Xử lý việc đăng ký người dùng mới.
   * @param username - Tên người dùng.
   * @param email - Địa chỉ email người dùng.
   * @param password - Mật khẩu người dùng.
   * @returns {Promise<AuthData | null>} - Thông tin người dùng đã được đăng ký hoặc null nếu đăng ký thất bại.
   */
  protected async handleRegisterUser(
    username: string,
    email: string,
    password: string
  ): Promise<AuthData | null> {
    let _authData: AuthData = {
      user: {
        id: null,
        username: null,
        email: null,
        permissions: [],
      },
      accessToken: "NULL",
    }; 
    // Kiểm tra xem người dùng với email đã tồn tại hay chưa
    if (this.findUserByEmail(email)) {
      return _authData; // Người dùng với email này đã tồn tại
    }

    // Tạo một ID người dùng mới duy nhất theo định dạng "TW{auto_increment_XXXXXX}"
    const id = this.generateUniqueUserId();

    // Tạo người dùng mới
    const newUser: User = {
      id,
      username,
      email,
      password,
      permissions: [], // Khởi tạo với một mảng rỗng quyền
    };
    usersData.push(newUser);

    _authData = {
      user: newUser,
      accessToken: "NULL",
    };

    return _authData;
  }

  // Hàm trợ giúp để tạo ID người dùng mới duy nhất theo định dạng "TW{auto_increment_XXXXXX}"
  private generateUniqueUserId(): string {
    // Vì đơn giản, chúng ta sử dụng một bộ đếm tăng dần đơn giản
    const nextId = usersData.length + 1;
    return `TW${nextId.toString().padStart(6, "0")}`;
  }

  /**
   * Xử lý đăng xuất người dùng.
   * @returns {Promise<void>}
   */
  protected async handleLogout(): Promise<void> {
    // Vì đây là bản demo, chúng ta không cần thực hiện bất kỳ hành động đăng xuất cụ thể nào
    // Trong một ứng dụng thực tế, bạn có thể muốn xóa phiên làm việc hoặc mã thông báo người dùng
    return;
  }

  /**
   * Hàm mô phỏng để lấy quyền của người dùng.
   * @param userId - ID người dùng.
   * @returns {string[]} - Mảng quyền của người dùng.
   */
  public getUserPermissions = (userId: string): EPermissions[] => {
    const user = usersData.find((u) => u.id === userId);
    return user ? user.permissions : [];
  };
}

export default DefaultAuthService;
