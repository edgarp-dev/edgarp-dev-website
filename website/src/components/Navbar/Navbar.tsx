import React from 'react';
import NavBarItem from './NavbarItem';
import padding from '../../utils/padding';
import NavbarContent from './NavbarContent';

const NavBar = () => {
  return (
    <nav
      id="header"
      className="fixed min-w-full z-10 top-0 h-14 decoration-solid bg-[#222831] shadow-lg">
      <div
        className={`mx-auto md:max-w-3xl ${padding.generalPadding} flex flex-wrap items-center justify-between mt-0 py-3`}>
        <span className="text-slate-200 text-xl no-underline hover:no-underline font-extrabold">
          edgarp.dev
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
