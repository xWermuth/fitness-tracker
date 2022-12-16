import React from 'react';
import Link from '../routes/Link';

const Logo: React.FC = () => {
  return (
    <div>
      <Link href="/" className="text-white uppercase text-lg font-bold">
        Tracker
      </Link>
      <div className="w-8 bg-purple-500 h-2 rounded"></div>
    </div>
  );
};

export default Logo;
