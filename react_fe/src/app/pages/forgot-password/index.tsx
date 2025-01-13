import { useEffect } from 'react';
import { WrapperStyled } from './styled';
import { useParams } from 'react-router-dom';
import ForgotPassword from '@components/forgot-password';
const ForgotPasswordPage = () => {
  const { token } = useParams();
  useEffect(() => {
    console.log(token);
  }, []);

  return <WrapperStyled>{token && <ForgotPassword token={token} />}</WrapperStyled>;
};

export default ForgotPasswordPage;
