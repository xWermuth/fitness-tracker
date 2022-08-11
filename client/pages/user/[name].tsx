import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserRes } from '../../api/user';
import Logo from '../../components/logo/Logo';
import { getUserInfo } from '../../store/features/user/user.selectors';
import { SVG_TRIANGLE_PATH } from '../../utils';

interface Props {
  user: UserRes;
}

const user: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [date, setDate] = useState('');
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    setDate(new Date().toLocaleString());
  }, []);

  // TODO fix
  if (!userInfo) {
    return <h3>Loading....</h3>;
  }

  return (
    <div className="w-full h-full bg-main-dark text-white p-10 space-y-10">
      <Logo />
      <div>
        <div className="flex items-center space-x-1 text-xl font-medium">
          <h1>Welcome back </h1>
          <h1 className="uppercase">{userInfo.email}!</h1>
        </div>

        <span className="text-sm font-normal">{date}</span>
      </div>

      <div className="rounded-lg p-5 bg-main-light w-80 space-y-3">
        <div className="rounded w-full h-40 overflow-hidden">
          <img src={SVG_TRIANGLE_PATH} className="w-full" draggable={false} />
        </div>
        <div className="w-full flex flex-col space-y-0">
          <h3 className="font-medium">Start workout name</h3>
          <span>
            <small className="text-gray-200 font-normal text-sm">Duration: </small>
            <small className="font-normal text-white text-sm">30 min.</small>
          </span>
          <span>
            <small className="text-gray-200 font-normal text-sm">Intensity: </small>
            <small className="font-normal text-white text-sm">Beginner</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default user;
