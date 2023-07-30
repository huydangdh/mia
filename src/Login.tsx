// Login.tsx

import React, { useState, useEffect } from "react";
import { useAuthorization } from "./components/usermanagement/UserAuthorization";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginAndFetchPermissions, isLoggedIn, user } = useAuthorization();

  const handleLogin = async () => {
    await loginAndFetchPermissions(username, password);
  };
  // Listen for changes in the isLoggedIn state
  useEffect(() => {
    if (isLoggedIn) {
      alert("Login Ok");
    } else {
      alert("Login NG");
    }
  }, [isLoggedIn]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
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
        <button onClick={handleLogin} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
