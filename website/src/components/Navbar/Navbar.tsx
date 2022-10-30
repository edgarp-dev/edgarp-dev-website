import React from 'react';
import colors from '../../utils/colors';
import NavBarItem from './NavbarItem';
import padding from '../../utils/padding';
import NavbarContent from './NavbarContent';

const NavBar = () => {
  return (
    <nav
      id="header"
      className={`fixed min-w-full z-10 top-0 h-14 decoration-solid bg-[${colors.secondaryColor}] shadow-lg`}>
      <div
        className={`mx-auto md:max-w-3xl ${padding.generalPadding} flex flex-wrap items-center justify-between mt-0 py-3`}>
        <span
          className={`${colors.textColor} text-xl no-underline hover:no-underline font-extrabold`}>
          edgar.dev
        </span>
        <NavbarContent>
          <NavBarItem href="/blog" text="Blog" />
          <NavBarItem href="/" text="About me" />
        </NavbarContent>
      </div>
    </nav>
  );
};

export default NavBar;
