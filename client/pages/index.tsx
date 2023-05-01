import type { NextPage } from 'next';
import HomeNav from '../components/nav/HomeNav';
import { SVG_TRIANGLE_PATH } from '../utils/resources.utils';
import { useDispatch } from 'react-redux';
import { doesHttpOnlyCookieExist } from '../utils';
import { useEffect } from 'react';
import { fetchUser } from '../store/features/user/user.actions';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (doesHttpOnlyCookieExist()) {
      // @ts-expect-error
      dispatch(fetchUser(null));
    }
  }, []);
  return (
    <div
      className="relative w-full h-full bg-cover p-main bg-opacity-40"
      style={{
        backgroundImage: `url('${SVG_TRIANGLE_PATH}')`,
      }}
    >
      <div className="w-full h-full">
        <HomeNav />
      </div>
    </div>
  );
};

export default Home;
