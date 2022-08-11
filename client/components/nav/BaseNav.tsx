import React from 'react';
import Logo from '../logo/Logo';

const BaseNav: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <nav className="flex flex-row w-full">
      <ul className="h-full w-1/2 flex justify-between items-center">
        <li className="mr-4">
          <Logo />
        </li>
      </ul>

      {children}
    </nav>
  );
};

export default BaseNav;
