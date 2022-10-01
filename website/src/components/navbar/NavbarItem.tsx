import React from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  text: string;
};

const NavBarItem = ({ href, text }: Props) => {
  return (
    <li className="mr-3">
      <Link
        href={href}
        className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4">
        {text}
      </Link>
    </li>
  );
};

export default NavBarItem;
