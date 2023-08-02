// Login.tsx

import React, { useEffect, useState } from "react";
import { useAuthorization } from "./components/usermanagement/UserAuthorization";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggedIn } = useAuthorization();

  const handleLogin = async () => await login(username, password);
  console.log(
    "🚀 ~ file: Login.tsx:14 ~ handleLogin ~ isLoggedIn:",
    isLoggedIn
  );

  useEffect(() => {});

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card login-card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Login</h1>
              {isLoggedIn ? (
                <Navigate to="/dashboard" replace={true}></Navigate>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>
                  <button
                    onClick={handleLogin}
                    className="btn btn-primary btn-block"
                  >
                    Login
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
