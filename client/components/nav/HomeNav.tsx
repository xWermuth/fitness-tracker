import React from 'react';
import { useSelector } from 'react-redux';
import { getUserDetails } from '../../api/user';
import { paths } from '../../config';
import { getAuthState } from '../../store/features/global/global.selectors';
import { getUserInfo } from '../../store/features/user/user.selectors';
import mc from '../../utils/mc.utils';
import Logo from '../logo/Logo';
import Link from '../routes/Link';

interface HomeNavProps {}

const HomeNav: React.FC<HomeNavProps> = ({}) => {
  const isAuthenticated = useSelector(getAuthState);
  const user = useSelector(getUserInfo);
  console.log('isAuthenticated', isAuthenticated);

  return (
    <nav className="flex flex-row w-full">
      <ul className="h-full w-1/2 flex justify-between items-center">
        <li className="mr-4">
          <Logo />
        </li>
      </ul>

      <ul className="h-full w-1/2 flex justify-end items-center space-x-4">
        {isAuthenticated ? (
          <>
            <NavBtn name="My profile" to={`${paths.PROFILE}${user?.name}`} className="bg-purple-600 px-4 py-2 " />
          </>
        ) : (
          <>
            <NavBtn name="Log in" to={paths.LOGIN} />
            <NavBtn name="Signup" to={paths.SIGNUP} className="bg-purple-600 px-4 py-2 " />
          </>
        )}
      </ul>
    </nav>
  );
};

const NavBtn: React.FC<{ name: string; to: string; className?: string }> = ({ name, to, className }) => {
  return (
    <li>
      <Link href={to} className={mc('rounded text-white text-lg', className)}>
        {name}
      </Link>
    </li>
  );
};

export default HomeNav;
