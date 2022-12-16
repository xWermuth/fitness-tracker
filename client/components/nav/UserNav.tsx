import React from 'react';
import { paths } from '../../config';
import Link from '../routes/Link';
import BaseNav from './BaseNav';

const UserNav: React.FC = () => {
  return (
    <BaseNav>
      <ul className="h-full w-1/2 flex justify-end items-center space-x-4">
        <li>
          <Link
            className="px-4 py-2 text-lg font-normal bg-green-600 rounded hover:bg-green-500 hover:scale-105 duration-100"
            href={paths.WORKOUT}
          >
            Create workout
          </Link>
        </li>
      </ul>
    </BaseNav>
  );
};

export default UserNav;
