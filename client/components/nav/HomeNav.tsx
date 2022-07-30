import React from 'react';
import { paths } from '../../utils';
import Link from '../routes/Link';

interface HomeNavProps {}

const HomeNav: React.FC<HomeNavProps> = ({}) => {
  return (
    <nav className="flex flex-row w-full h-16 px-16">
      <ul className="h-full w-1/2 flex justify-between items-center">
        <li className="mr-4">
          <Link href="" className="text-white uppercase text-lg font-bold">
            Tracker
          </Link>
          <div className="w-8 bg-purple-500 h-2 rounded"></div>
        </li>
      </ul>

      <ul className="h-full w-1/2 flex justify-end items-center space-x-4">
        <li>
          <Link href={paths.LOGIN} className="text-white text-lg">
            Log in
          </Link>
        </li>

        <li>
          <Link href={paths.SIGNUP} className=" bg-purple-600 px-4 py-2 rounded text-white text-lg">
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNav;
