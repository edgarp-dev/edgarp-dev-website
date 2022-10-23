import React from 'react';
import colors from '../../utils/colors';
import NavBarItem from './NavbarItem';

const NavBar = () => {
  return (
    <nav
      id="header"
      className="fixed w-full z-10 top-0 h-14 decoration-solid bg-slate-900 shadow-lg">
      <div className="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3 px-4">
        <span
          className={`${colors.textColor} text-xl no-underline hover:no-underline font-extrabold`}>
          edgar.dev
        </span>
        <div
          id="nav-content"
          className="w-auto flex-grow flex items-center lg:mt-0 mt-2 z-20"></div>
        <ul className="list-none p-0 flex justify-end flex-1 items-center">
          <NavBarItem href="/blog" text="Blog" />
          <NavBarItem href="/" text="About me" />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
