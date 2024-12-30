import {
  FacebookOutlined,
  GithubOutlined,
  GooglePlusOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import {
  ButtonStyled,
  CloseAuth,
  Container,
  Form,
  FormContainer,
  SocialIcons,
  Toggle,
  ToggleContainer,
  TogglePanel,
  Wrapper,
} from './styled';

import { FormInput, FormPassword } from '@components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@store/auth/auth.selector';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { loginScheme, signUpScheme } from './scheme';
import Notification from '@components/notification';
import { useNavigate } from 'react-router-dom';
import ModalMail from '@components/modal-mail';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthForm = ({ closeFunc, isSignIn }: any) => {
  const { t } = useTranslation(['common']);
  const navigate = useNavigate();
  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);
  const [active, setActive] = useState(isSignIn);
  const formLogin = useForm<{ email: string; password: string }>({
    resolver: yupResolver(loginScheme(t)),
  });
  const formSignUp = useForm<{ name: string; email: string; password: string }>({
    resolver: yupResolver(signUpScheme(t)),
  });
  const { handleSubmit: handleSubmitLogin } = formLogin;
  const { handleSubmit: handleSubmitSignUp } = formSignUp;

  const { onLogin, onSignUp, loading } = useAuth();

  const onSubmitLogin = useCallback(
    (data: Types.ILoginRequest) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onLogin(data).then((response: any) => {
        if (!response?.error) {
          Notification.success('Login successful');
          if (response.payload.data.data.user.role === 'admin') {
            return navigate('/admin');
          }
          navigate(0);
          closeFunc();
        }
      });
    },
    [onLogin],
  );

  const onSubmitSignUp = useCallback(
    (data: Types.ISignUpRequest) => {
      onSignUp(data).then(() => {
        Notification.success('Sign up successful, please check your email to verify account');
        setActive(false);
      });
    },
    [onSignUp],
  );

  return (
    <Wrapper>
      {isOpenForgotPassword && <ModalMail close={() => setIsOpenForgotPassword(false)} />}
      <CloseAuth onClick={closeFunc} />
      <Container className={classNames({ active: active })}>
        {/* Sign up */}
        <FormContainer className="form-container sign-up">
          <FormProvider {...formSignUp}>
            <Form onSubmit={handleSubmitSignUp(onSubmitSignUp)}>
              <h1>Create Account</h1>
              <SocialIcons>
                <a
                  href="#"
                  className="icon">
                  <GooglePlusOutlined />
                </a>
                <a
                  href="#"
                  className="icon">
                  <FacebookOutlined />
                </a>
                <a
                  href="#"
                  className="icon">
                  <GithubOutlined />
                </a>
                <a
                  href="#"
                  className="icon">
                  <LinkedinOutlined />
                </a>
              </SocialIcons>
              <span>or use your email for registration</span>
              <FormInput
                name="name"
                placeholder="Name"
              />
              <FormInput
                name="email"
                placeholder="Email"
              />
              <FormPassword
                name="password"
                placeholder="Password"
              />
              <ButtonStyled
                loading={loading}
                htmlType="submit">
                Sign Up
              </ButtonStyled>
            </Form>
          </FormProvider>
        </FormContainer>
        {/* Sign in */}
        <FormContainer className="form-container sign-in">
          <FormProvider {...formLogin}>
            <Form onSubmit={handleSubmitLogin(onSubmitLogin)}>
              <h1>Sign In</h1>
              <SocialIcons>
                <a
                  href="#"
                  className="icon">
                  <GooglePlusOutlined />
                </a>
                <a
                  href="#"
                  className="icon">
                  <FacebookOutlined />
                </a>
                <a
                  href="#"
                  className="icon">
                  <GithubOutlined />
                </a>
                <a
                  href="#"
                  className="icon">
                  <LinkedinOutlined />
                </a>
              </SocialIcons>
              <span>or use your email password</span>
              <FormInput
                name="email"
                placeholder="Email"
              />
              <FormPassword
                name="password"
                placeholder="Password"
              />
              <a
                style={{ cursor: 'pointer' }}
                onClick={() => setIsOpenForgotPassword(true)}>
                Forget Your Password?
              </a>
              <ButtonStyled
                loading={loading}
                htmlType="submit">
                Sign In
              </ButtonStyled>
            </Form>
          </FormProvider>
        </FormContainer>
        <ToggleContainer className="toggle-container">
          <Toggle>
            <TogglePanel className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <ButtonStyled
                className={classNames('toggle')}
                id="login"
                onClick={() => setActive(false)}>
                Sign In
              </ButtonStyled>
            </TogglePanel>
            <TogglePanel className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <ButtonStyled
                className={classNames('toggle')}
                id="register"
                onClick={() => setActive(true)}>
                Sign Up
              </ButtonStyled>
            </TogglePanel>
          </Toggle>
        </ToggleContainer>
      </Container>
    </Wrapper>
  );
};

export default AuthForm;
