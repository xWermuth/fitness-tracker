import NLink, { LinkProps } from 'next/link';

import React from 'react';

interface Props extends LinkProps {
  className?: string;
  children?: string;
}

const Link: React.FC<Props> = ({ className, children, ...props }) => {
  return (
    <NLink {...props}>
      <a className={className}>{children}</a>
    </NLink>
  );
};

export default Link;
