// src/components/common/Sidebar.tsx

import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <Navbar bg="dark" variant="dark" className="sidebar-navbar">
        <Navbar.Brand href="/">Z-MES</Navbar.Brand>
        <Button variant="link" className="close-button" onClick={onClose}>
          &times;
        </Button>
      </Navbar>
      <Nav className="flex-column sidebar-links">
        {/* Add links to your different apps/routes */}
        <Nav.Link as={Link} to="/dashboard">
          Dashboard
        </Nav.Link>
        {/* Add more links here */}
      </Nav>
    </div>
  );
};

export default Sidebar;
