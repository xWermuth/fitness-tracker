import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { doesHttpOnlyCookieExist } from '../../utils';
import { fetchUser } from '../../store/features/user/user.actions';

const UserProvider: React.FC<{ children?: JSX.Element }> = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (doesHttpOnlyCookieExist()) {
      // @ts-expect-error
      dispatch(fetchUser(null));
    }
  }, []);
  return <>{children}</>;
};

export default UserProvider;
