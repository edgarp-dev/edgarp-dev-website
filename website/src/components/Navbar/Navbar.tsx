import React from 'react';
import NavBarItem from './NavbarItem';

const NavBar = () => {
  return (
    <nav id="header" className="fixed w-full z10 top-0 h-14">
      <div className="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">
        <div className="pl-4">
          <span className="text-gray-900 text-xl no-underline hover:no-underline font-extrabold">
            edgar.dev
          </span>
        </div>
        <div
          id="nav-content"
          className="w-auto flex-grow flex items-center lg:mt-0 md:bg-transparent bg-gray-100 mt-2 z-20"></div>
        <ul className="list-none p-0 flex justify-end flex-1 items-center">
          <NavBarItem href="/" text="About Me" />
          <NavBarItem href="/blog" text="Blog" />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
