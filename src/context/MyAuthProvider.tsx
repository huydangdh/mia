import { ReactNode, createContext, useEffect, useMemo, useState } from "react";
import DefaultAuthService from "../services/DefaultAuthService";
import SupabaseUserAuthService from "../services/SupabaseUserAuthService";
import AbstractUserAuthService from "../services/interface/AbstractUserAuthService";
import { AuthData } from "../services/model/MMUser";

// Loại dữ liệu cho cấu hình của nhà cung cấp xác thực
type AuthProviderConfigType = {
  [key: string]: any;
};

// Cấu hình các nhà cung cấp xác thực
const authProvidersConfig: AuthProviderConfigType = {
  default: {},
  supabase: {},
  // Thêm cấu hình cho nhà cung cấp khác khi cần
};

// Loại dữ liệu cho ngữ cảnh xác thực
type AuthCtxType = {
  MELogin: (
    username: string,
    password: string,
    provider: string
  ) => Promise<AuthData>;
  MELogout: (provider: string) => Promise<void>;
  selectedProvider: string | null;
  setSelectedProvider: React.Dispatch<React.SetStateAction<string | null>>;
  userAuthInfo: {
    data: AuthData | null;
    isAuthed: boolean;
  };
  isLoading: boolean;
};

// Tạo ngữ cảnh xác thực
export const MyAuthContext = createContext<AuthCtxType>({} as AuthCtxType);

// Các thuộc tính của Component MyAuthProvider
export type AuthorizationProps = {
  children: ReactNode;
};

// Khóa lưu trữ thông tin người dùng trong localStorage
const USER_DATA_KEY = "mmUserData";

// Component MyAuthProvider
export default function MyAuthProvider(props: AuthorizationProps) {
  // Trạng thái lựa chọn nhà cung cấp xác thực
  const [selectedProvider, setSelectedProvider] = useState<string | null>(
    () => {
      return localStorage.getItem("selectedProvider") || "default";
    }
  );

  // Trạng thái thông tin người dùng
  const [mmUser, setMMUser] = useState<AuthData | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true)
  // Lấy thông tin người dùng từ localStorage khi component được gắn vào
  useEffect(() => {
    const storedUserData = localStorage.getItem(USER_DATA_KEY);
    console.log(
      "LS -> src/context/MyAuthProvider.tsx:69 -> storedUserData: ",
      storedUserData
    );
    if (storedUserData) {
      setMMUser(JSON.parse(storedUserData));
    }

    setIsLoading(false)
  }, []);
  // Update the useEffect that sets the selectedProvider
  useEffect(() => {
    // If selectedProvider is not already set in localStor
    //
    //
    //
    //
    //
    // age, then set it
    localStorage.setItem("selectedProvider", selectedProvider);
  }, [selectedProvider]);

  // Tạo thể hiện của nhà cung cấp dựa trên tên
  function createInstanceProvider(provider: string): AbstractUserAuthService {
    switch (provider) {
      case "default":
        return new DefaultAuthService();
      case "supabase":
        return new SupabaseUserAuthService();
      default:
        return null;
    }
  }

  // Sử dụng useMemo để tạo thể hiện của các nhà cung cấp một lần và sử dụng lại
  const providerInstances = useMemo(() => {
    const instances: { [key: string]: AbstractUserAuthService } = {};

    Object.keys(authProvidersConfig).forEach((provider) => {
      instances[provider] = createInstanceProvider(provider);
    });

    return instances;
  }, []);

  // Hàm xử lý đăng nhập
  async function MELogin(username: string, password: string, provider: string) {
    const providerConfig = authProvidersConfig[provider];
    if (!providerConfig) {
      throw new Error(`Nhà cung cấp '${provider}' không được cấu hình.`);
    }

    // Lấy thể hiện của nhà cung cấp từ cache
    const providerInstance = providerInstances[provider];

    // Thực hiện xác thực dựa trên thể hiện của nhà cung cấp đã lấy
    const authData: AuthData = await providerInstance.emailPasswordLogin(
      username,
      password
    );

    // Lưu thông tin người dùng vào localStorage khi đăng nhập thành công
    if (authData.user.id !== null) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(authData));
    }
    return authData;
  }

  // Hàm xử lý đăng xuất
  async function MELogout(provider: string) {
    const providerConfig = authProvidersConfig[provider];
    if (!providerConfig) {
      throw new Error(`Nhà cung cấp '${provider}' không được cấu hình.`);
    }
    localStorage.clear();
    // TODO: Xử lý đăng xuất dựa trên cấu hình của nhà cung cấp

    // TODO: Thêm mã xử lý đăng xuất
  }

  // Thông tin xác thực của người dùng
  const userAuthInfo = {
    data: mmUser,
    isAuthed: mmUser !== null,
  };

  // Tạo giá trị ngữ cảnh bằng useMemo để đảm bảo tạo lại giá trị chỉ khi các phụ thuộc thay đổi
  const ctxValue = useMemo(
    () => ({
      MELogin,
      MELogout,
      selectedProvider,
      setSelectedProvider,
      userAuthInfo,
      isLoading
    }),
    [MELogin, MELogout, selectedProvider, setSelectedProvider, userAuthInfo, isLoading]
  );

  return (
    <MyAuthContext.Provider value={{ ...ctxValue }}>
      {props.children}
    </MyAuthContext.Provider>
  );
}
