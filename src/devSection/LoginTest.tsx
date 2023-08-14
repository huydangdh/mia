import React, { useState } from "react";
  
import { AuthData } from "../services/model/MMUser";
import { useMMAuthentication } from "../components/usermanagement/useMMAuthentication";

const LoginComponent = () => {
  const { MELogin, MELogout, selectedProvider, setSelectedProvider } = useMMAuthentication();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userM, setUserM] = useState<AuthData>({} as AuthData)
  const handleLogin = async () => {
    try {
      const authData = await MELogin(username, password, selectedProvider || "");
      console.log("LS -> src/devSection/LoginTest.tsx:11 -> authData: ", authData)
      // Handle successful authentication
    } catch (error) {
      console.log("LS -> src/devSection/LoginTest.tsx:13 -> error: ", error)
      // Handle authentication error
    }
      
  };

  const handleLogout = async () => {
    try {
      await MELogout(selectedProvider || "");
      // Handle successful logout
      console.log("Logged out");
    } catch (error) {
      // Handle logout error
      console.error("Logout error:", error);
    }
  };

  const handleProviderChange = (event) => {
    setSelectedProvider(event.target.value);
  };

  return (
    <div>
      <h2>Login Component</h2>
      <div>
        <label>
          Select Provider:
          <select value={selectedProvider || ""} onChange={handleProviderChange}>
            <option value="">Select...</option>
            <option value="default">Default</option>
            <option value="supabase">Supabase</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default LoginComponent;
