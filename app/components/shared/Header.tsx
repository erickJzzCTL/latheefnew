import React from 'react';
import Image from 'next/image';
import logo from '../../../assets/home/logo.png';
const Header = () => {
  return (
    <div className="header">
      <Image src={logo} alt="Logo" />
    </div>
  );
};

export default Header;
