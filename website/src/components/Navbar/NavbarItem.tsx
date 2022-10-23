import React from 'react';
import Link from 'next/link';
import colors from '../../utils/colors';

type Props = {
  href: string;
  text: string;
};

const NavBarItem = ({ href, text }: Props) => {
  return (
    <li className="mr-5 last:mr-0">
      <Link
        href={href}
        className={`${colors.textColor} inline-bloc no-underline hover:text-gray-900 hover:text-underline`}>
        {text}
      </Link>
    </li>
  );
};

export default NavBarItem;
