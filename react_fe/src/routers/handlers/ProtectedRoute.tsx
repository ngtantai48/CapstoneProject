import { getLocalStorage, STORAGE } from '@utils/helpers';
import { Modal } from 'antd';
import { Fragment, useMemo } from 'react';

interface Props {
  isAdmin?: boolean;
  children?: React.ReactNode;
}
const ProtectedRoute = (props: Props) => {
  const USER_DATA = useMemo(() => {
    const localStorageData = getLocalStorage(STORAGE.USER_DATA);
    return localStorageData ? JSON.parse(localStorageData) : null;
  }, []);
  const { isAdmin, children } = props;
  if (isAdmin && USER_DATA?.role !== 'admin') {
    Modal.error({
      title: 'You are not admin',
      onOk: () => {
        window.location.href = '/home';
      },
    });
    return <Fragment />;
  }
  if (!USER_DATA?.role) {
    Modal.error({
      title: 'Please login to access this route',
      onOk: () => {
        window.location.href = '/home';
      },
    });
    return <Fragment />;
  }
  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
