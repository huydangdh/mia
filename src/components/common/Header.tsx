
// Header.tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useMMAuthentication } from '../usermanagement/useMMAuthentication';

const Header: React.FC = () => {
  const { userAuthInfo, MELogout,selectedProvider } = useMMAuthentication(); // Destructure the isLoggedIn and logout function from useAuthorization hook

  const handleLogout = () => {
    MELogout(selectedProvider); // Call the logout function on logout button click
    window.location.href = "/login"
  };

  useEffect(()=>{
    console.log("🚀 ~ file: Header.tsx:20 ~ useEffect ~ isLoggedIn:", userAuthInfo.isAuthed)
  },[])

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
          {userAuthInfo.isAuthed ? (
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
