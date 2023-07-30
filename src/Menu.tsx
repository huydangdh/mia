// Menu.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthorization, Permissions } from "./components/usermanagement/UserAuthorization";

const Menu = () => {
  const { hasPermission, isLoggedIn } = useAuthorization();

  return (
    <div className="menu-container">
      <h1>Menu</h1>
      {isLoggedIn && (
        <div className="menu-items">
          {hasPermission(Permissions.VIEW_DASHBOARD) && (
            <Link to="/dashboard">Dashboard</Link>
          )}
          {hasPermission(Permissions.VIEW_REPORTS) && (
            <Link to="/reports">Reports</Link>
          )}
          {hasPermission(Permissions.MANAGE_USERS) && (
            <Link to="/users">Manage Users</Link>
          )}
          {/* Other menu items */}
        </div>
      )}
    </div>
  );
};

export default Menu;
