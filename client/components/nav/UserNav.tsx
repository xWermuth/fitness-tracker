import React from 'react';
import BaseNav from './BaseNav';

const UserNav: React.FC = () => {
  return (
    <BaseNav>
      <ul className="h-full w-1/2 flex justify-end items-center space-x-4">
        <li>
          <button
            type="button"
            className="px-4 py-2 text-lg font-normal bg-green-600 rounded hover:bg-green-500 hover:scale-105 duration-100"
          >
            Create workout
          </button>
        </li>
      </ul>
    </BaseNav>
  );
};

export default UserNav;
