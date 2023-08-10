import React, { useState } from "react";
import { useAuthorization } from "./components/usermanagement/UserAuthorization";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false); // Thêm state cho hiển thị thông báo

  const { login, isLoggedIn } = useAuthorization();

  // Xử lý đăng nhập
  const handleLogin = async () => {
    const success = await login(username, password);

    if (!success) {
      setShowAlert(true); // Hiển thị thông báo nếu đăng nhập không thành công
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
                  {/* Hiển thị thông báo nếu đăng nhập không thành công */}
                  {showAlert && (
                    <div className="alert alert-danger" role="alert">
                      Đăng nhập không thành công. Vui lòng kiểm tra tên đăng nhập và mật khẩu của bạn.
                    </div>
                  )}

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
                  >
                    Đăng Nhập
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
