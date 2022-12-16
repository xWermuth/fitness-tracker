import React from 'react';
import mc from '../../utils/mc.utils';
import Link from '../routes/Link';

const NavBtn: React.FC<{ name: string; to: string; className?: string }> = ({ name, to, className }) => {
  return (
    <li>
      <Link href={to} className={mc('rounded text-white text-lg', className)}>
        {name}
      </Link>
    </li>
  );
};

export default NavBtn;
