import React, { FC, ReactElement } from 'react';
import NavBarItem from './NavbarItem';

type Props = {
  children: ReactElement<typeof NavBarItem>[];
};

const NavbarContent: FC<Props> = ({ children }) => (
  <div id="nav-content" className="flex-grow flex items-center z-20">
    <ul className="list-none p-0 flex justify-end flex-1 items-center">
      {children}
    </ul>
  </div>
);

export default NavbarContent;
