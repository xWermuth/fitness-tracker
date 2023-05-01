import NLink, { LinkProps } from 'next/link';

import React from 'react';

interface Props extends LinkProps {
  className?: string;
  children?: string;
}

const Link: React.FC<Props> = ({ children, ...props }) => {
  return <NLink {...props}>{children}</NLink>;
};

export default Link;
