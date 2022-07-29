import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from '../../pages/routes';

interface HomeNavProps {}

const HomeNav: React.FC<HomeNavProps> = ({}) => {
  return (
    <nav className="flex flex-row w-full h-16 px-16">
      <ul className="h-full w-1/2 flex justify-between items-center">
        <li className="mr-4">
          <Link to="" className="text-white uppercase text-lg font-bold">
            Tracker
            <div className="w-8 bg-purple-500 h-2 rounded"></div>
          </Link>
        </li>
      </ul>

      <ul className="h-full w-1/2 flex justify-end items-center space-x-4">
        <li>
          <Link to={paths.LOGIN} className="text-white text-lg">
            Log in
          </Link>
        </li>

        <li>
          <Link to={paths.SIGNUP} className=" bg-purple-600 px-4 py-2 rounded text-white text-lg">
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HomeNav;
