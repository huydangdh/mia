// Menu.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthorization } from './components/usermanagement/UserAuthorization';
import './Menu.css'; // Import your custom CSS file for styling

const Menu = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { hasPermission, loginAndFetchPermissions, isLoggedIn } = useAuthorization();

  const handleLogin = async () => {
    await loginAndFetchPermissions(username, password);
    if (isLoggedIn) {
      alert('Đăng nhập thành công');
    } else {
      alert('Đăng nhập không thành công');
    }
  };

  return (
    <div className="menu-container">
      <h1>Menu</h1>
      <div className="login-form">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>

      {isLoggedIn && (
        <div className="menu-items">
          {hasPermission(Permissions.VIEW_DASHBOARD) && <Link to="/dashboard">Dashboard</Link>}
          {hasPermission(Permissions.VIEW_REPORTS) && <Link to="/reports">Reports</Link>}
          {hasPermission(Permissions.MANAGE_USERS) && <Link to="/users">Manage Users</Link>}
          {/* Other menu items */}
        </div>
      )}
    </div>
  );
};

export default Menu;
