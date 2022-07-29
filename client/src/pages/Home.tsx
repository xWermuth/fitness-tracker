import React from 'react';
import HomeNav from '../components/nav/HomeNav';
import svg from '../svg/triangles.svg';

const Home: React.FC = ({}) => {
  return (
    <div className="relative w-screen h-screen bg-cover" style={{ backgroundImage: `url(${svg})` }}>
      <HomeNav />
    </div>
  );
};

export default Home;
