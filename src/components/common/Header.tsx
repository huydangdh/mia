// src/components/common/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../Menu';

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={" "} alt="LHZ-MEZ Logo" />
        </Link>
      </div>
      <Menu />
    </header>
  );
};

export default Header;

