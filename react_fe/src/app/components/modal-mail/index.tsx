import { Input, Modal } from 'antd';
import { useCallback, useState } from 'react';
import { useUser } from '@store/user/user.selector';
import styled from 'styled-components';
import Notification from '@components/notification';

interface IProps {
  close: () => void;
}

const ModalStyled = styled(Modal)`
  .ant-btn.ant-btn-primary {
    background-color: #512da8;
    &:hover {
      background-color: #8867d5;
    }
  }
`;

const ModalMail = ({ close }: IProps) => {
  const { onForgotPassword } = useUser();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(() => {
    setLoading(true);
    if (!email) return setError(true);
    setError(false);
    onForgotPassword({ email }).then((data) => {
      if ('error' in data) {
        console.log(error);
      } else {
        Notification.success('Please check your email to verify reset password');
        close();
      }
      setLoading(false);
    });
  }, [email, error]);
  return (
    <ModalStyled
      title="Input your Email to reset password"
      onOk={handleSubmit}
      onCancel={() => close()}
      closeIcon={false}
      confirmLoading={loading}
      open={true}>
      <Input onChange={(e) => setEmail(e.target.value)} />
      {error && <p style={{ color: 'red', textAlign: 'right' }}>Please enter your email</p>}
    </ModalStyled>
  );
};

export default ModalMail;
