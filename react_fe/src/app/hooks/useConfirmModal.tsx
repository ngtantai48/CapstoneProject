import Confirm from '@components/confirm';
import { useState } from 'react';

const useConfirmModal = () => {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [confirmProps, setConfirmProps] = useState({
    title: '',
    body: '',
    onOk: () => {},
    onCancel: () => {},
    okText: 'OK',
  });

  const showConfirm = (
    title: string,
    body: string,
    onOk: () => void,
    onCancel: () => void,
    okText = 'OK',
  ) => {
    setConfirmProps({ title, body, onOk, onCancel, okText });
    setIsConfirmVisible(true);
  };

  const handleConfirmOK = () => {
    confirmProps.onOk();
    setIsConfirmVisible(false);
  };

  const handleConfirmCancel = () => {
    confirmProps.onCancel();
    setIsConfirmVisible(false);
  };

  const ConfirmDialog = () => (
    <Confirm
      title={confirmProps.title}
      body={confirmProps.body}
      open={isConfirmVisible}
      onOk={handleConfirmOK}
      onCancel={handleConfirmCancel}
      okText={confirmProps.okText}
    />
  );

  return { showConfirm, ConfirmDialog };
};

export default useConfirmModal;
