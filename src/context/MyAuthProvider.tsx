import React, { ReactNode, createContext, useContext, useState, useEffect, useMemo } from "react";
import { AuthData } from "../services/model/MMUser";
import DefaultAuthService from "../services/DefaultAuthService";
import SupabaseUserAuthService from "../services/SupabaseUserAuthService";
import AbstractUserAuthService from "../services/interface/AbstractUserAuthService";

// Loại dữ liệu cho cấu hình của nhà cung cấp xác thực
type AuthProviderConfigType = {
  [key: string]: any; // Bạn có thể định nghĩa các cấu hình cụ thể cho nhà cung cấp ở đây
};

const authProvidersConfig: AuthProviderConfigType = {
  default: {},
  supabase: {}, // Ví dụ cấu hình cho Supabase
  // Thêm các cấu hình cho nhà cung cấp khác khi cần
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
};

// Tạo ngữ cảnh xác thực
const MyAuthContext = createContext<AuthCtxType>({} as AuthCtxType);

// Các thuộc tính của Component MyAuthProvider
export type AuthorizationProps = {
  children: ReactNode;
};

// Component MyAuthProvider
export default function MyAuthProvider(props: AuthorizationProps) {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(
    () => {
      return localStorage.getItem("selectedProvider") || null;
    }
  );

  // Lưu trạng thái 'selectedProvider' vào localStorage khi thay đổi
  useEffect(() => {
    if (selectedProvider) {
      localStorage.setItem("selectedProvider", selectedProvider);
    } else {
      localStorage.removeItem("selectedProvider");
    }
  }, [selectedProvider]);

  // Tạo một thể hiện của nhà cung cấp dựa trên tên
  function createInstanceProvider(provider: string): AbstractUserAuthService {
    switch (provider) {
      case 'default':
        return new DefaultAuthService();
      case 'supabase':
        return new SupabaseUserAuthService();
      default:
        return null
    }
  }

  // Sử dụng useMemo để tạo thể hiện của các nhà cung cấp một lần và sử dụng lại
  const providerInstances = useMemo(() => {
    const instances: { [key: string]: AbstractUserAuthService } = {};

    Object.keys(authProvidersConfig).forEach((provider) => {
      instances[provider] = createInstanceProvider(provider);
    });

    // In ra mảng các thể hiện nhà cung cấp trong console
    console.log("Danh sách thể hiện nhà cung cấp: ", instances);
    return instances;
  }, []);

  // Hàm xử lý đăng nhập
  async function MELogin(username: string, password: string, provider: string) {
    const providerConfig = authProvidersConfig[provider];
    if (!providerConfig) {
      throw new Error(`Nhà cung cấp '${provider}' không được cấu hình.`);
    }

    // Lấy hoặc tạo thể hiện của nhà cung cấp từ cache
    const providerInstance = providerInstances[provider];

    // Thực hiện xác thực dựa trên thể hiện của nhà cung cấp đã lấy
    const authData: AuthData = await providerInstance.emailPasswordLogin(username, password);

    return authData;
  }

  // Hàm xử lý đăng xuất
  async function MELogout(provider: string) {
    const providerConfig = authProvidersConfig[provider];
    if (!providerConfig) {
      throw new Error(`Nhà cung cấp '${provider}' không được cấu hình.`);
    }

    // Xử lý đăng xuất dựa trên cấu hình của nhà cung cấp

    // TODO: Thêm mã xử lý đăng xuất

  }

  return (
    <MyAuthContext.Provider
      value={{ MELogin, MELogout, selectedProvider, setSelectedProvider }}
    >
      {props.children}
    </MyAuthContext.Provider>
  );
}

// Hook sử dụng ngữ cảnh xác thực
export const useAuthentication = () => {
  return useContext(MyAuthContext);
};
