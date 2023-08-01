
// Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useAuthorization } from '../usermanagement/UserAuthorization';


const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuthorization(); // Destructure the isLoggedIn and logout function from useAuthorization hook

  const handleLogout = () => {
    logout(); // Call the logout function on logout button click
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Z-MES
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>
          {/* Add more navigation links as needed */}
          {isLoggedIn ? (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link> // Display Logout link when user is logged in
          ) : (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
