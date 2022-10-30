import React from 'react';
import Link from 'next/link';

type Props = {
  href: string;
  text: string;
};

const NavBarItem = ({ href, text }: Props) => {
  return (
    <li className="mr-5 last:mr-0">
      <Link
        href={href}
        className="text-slate-200 inline-bloc no-underline hover:text-gray-900 hover:text-underline">
        {text}
      </Link>
    </li>
  );
};

export default NavBarItem;
