import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeNav from '../components/nav/HomeNav';
import { setAuthenticated } from '../store/features/global/global.actions';
import { getAuthState } from '../store/features/global/global.selectors';
import { SVG_TRIANGLE_PATH } from '../utils/resources.utils';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getAuthState);

  useEffect(() => {
    dispatch(setAuthenticated(true));
  }, []);

  return (
    <div
      className="relative w-screen h-screen bg-cover"
      style={{
        backgroundImage: `url('${SVG_TRIANGLE_PATH}')`,
      }}
    >
      <div className="w-full h-full bg-slate-900 bg-opacity-40">
        <HomeNav />
      </div>
    </div>
  );
};

export default Home;
