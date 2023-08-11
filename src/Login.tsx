import React, { useState } from "react";
import { useAuthorization } from "./components/usermanagement/UserAuthorization";
import { Navigate } from "react-router-dom";

import DefaultAuthService from "./services/DefaultAuthService";
import { AuthData } from "./services/model/MMUser";
import AbstractUserAuthService from "./services/interface/AbstractUserAuthService";
import SupabaseUserAuthService from "./services/SupabaseUserAuthService";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<AbstractUserAuthService | null>(new DefaultAuthService()); // Store the provider instance
  const [selectedProviderKey, setSelectedProviderKey] = useState("default");
  const { login, isLoggedIn } = useAuthorization(selectedProvider);
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State for login indication


  const handleLogin = async () => {
    let AuthData: AuthData| null = null;
    setShowAlert(false);
    setIsLoggingIn(true); // Set loading indication to true
    AuthData = await login(username, password);
    setIsLoggingIn(false); // Set loading indication to false

    if (AuthData.user.id === null) {
      setShowAlert(true);
    }
  };

  const handleProviderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProviderKey(event.target.value);

    switch (event.target.value) {
      case "default":
        setSelectedProvider(new DefaultAuthService());
        break;
      case "supabase":
        setSelectedProvider(new SupabaseUserAuthService());
        break;
      default:
        setSelectedProvider(null);
        break;
    }

  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card login-card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Đăng Nhập</h1>
              {isLoggedIn ? (
                <Navigate to="/dashboard" replace={true} />
              ) : (
                <>
                  {showAlert && (
                    <div className="alert alert-danger" role="alert">
                      Đăng nhập không thành công. Vui lòng kiểm tra tên đăng
                      nhập và mật khẩu của bạn.
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="provider">Chọn Nhà Cung Cấp</label>
                    <select
                      id="provider"
                      className="form-control"
                      value={selectedProviderKey}
                      onChange={handleProviderChange}
                    >
                      <option value="default">Mặc Định</option>
                      <option value="supabase">Supabase</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="username">Tên Đăng Nhập</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Nhập tên đăng nhập"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Mật Khẩu</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                    />
                  </div>
                  <button
                    onClick={handleLogin}
                    className="btn btn-primary btn-block"
                    disabled={isLoggingIn} // Disable the button while logging in
                  >
                    {isLoggingIn ? "Đang Đăng Nhập..." : "Đăng Nhập"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
