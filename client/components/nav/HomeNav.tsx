import React from 'react';
import { useSelector } from 'react-redux';
import { getUserDetails } from '../../api/user';
import { paths } from '../../config';
import { getAuthState } from '../../store/features/global/global.selectors';
import { getUserInfo } from '../../store/features/user/user.selectors';
import mc from '../../utils/mc.utils';
import NavBtn from '../buttons/NavBtn';
import Logo from '../logo/Logo';
import Link from '../routes/Link';
import BaseNav from './BaseNav';

interface HomeNavProps {}

const HomeNav: React.FC<HomeNavProps> = ({}) => {
  const isAuthenticated = useSelector(getAuthState);
  const user = useSelector(getUserInfo);
  console.log('isAuthenticated', isAuthenticated);

  return (
    <BaseNav>
      <ul className="h-full w-1/2 flex justify-end items-center space-x-4">
        {isAuthenticated ? (
          <>
            <NavBtn name="Create Workout" to={`${paths.WORKOUT}`} className="bg-green-600 px-4 py-2 " />
            <NavBtn name="My Profile" to={`${paths.PROFILE}${user?.name}`} className="bg-purple-600 px-4 py-2 " />
          </>
        ) : (
          <>
            <NavBtn name="Log in" to={paths.LOGIN} />
            <NavBtn name="Signup" to={paths.SIGNUP} className="bg-purple-600 px-4 py-2 " />
          </>
        )}
      </ul>
    </BaseNav>
  );
};

export default HomeNav;
