import type { NextPage } from 'next';
import HomeNav from '../components/nav/HomeNav';
import { SVG_TRIANGLE_PATH } from '../utils/resources.utils';

const Home: NextPage = () => {
  return (
    <div
      className="relative w-screen h-screen bg-cover p-main"
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
