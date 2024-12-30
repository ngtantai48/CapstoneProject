/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormPassword } from '@components/form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUser } from '@store/user/user.selector';
import { Button } from 'antd';
import { TFunction } from 'i18next';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { WrapperStyled } from './styled';
import Notification from '@components/notification';
import { removeLocalStorage, STORAGE } from '@utils/helpers';
import { useNavigate } from 'react-router-dom';
const scheme = (t: TFunction) =>
  yup.object().shape({
    newPassword: yup
      .string()
      .trim()
      .required(
        t('error_message:validation.required', {
          key: t('common:auth.new_password'),
        }),
      )
      .min(
        8,
        t('error_message:validation.min_length', {
          key: t('common:auth.new_password'),
          min: 8,
        }),
      )
      .max(
        32,
        t('error_message:validation.max_length', {
          key: t('common:auth.new_password'),
          max: 32,
        }),
      ),
    confirmPassword: yup
      .string()
      .trim()
      .required(
        t('error_message:validation.required', {
          key: t('common:auth.confirm_password'),
        }),
      )
      .min(
        8,
        t('error_message:validation.min_length', {
          key: t('common:auth.confirm_password'),
          min: 8,
        }),
      )
      .max(
        32,
        t('error_message:validation.max_length', {
          key: t('common:auth.confirm_password'),
          max: 32,
        }),
      )
      .oneOf([yup.ref('newPassword')], t('error_message:validation.password_not_match')),
  });

interface IFormItem {
  newPassword: string;
  confirmPassword: string;
}

interface IProps {
  token: string;
}

const ForgotPassword = ({ token }: IProps) => {
  const { t } = useTranslation(['common']);
  const { onResetPassword } = useUser();
  const navigate = useNavigate();

  const form = useForm<IFormItem>({
    resolver: yupResolver(scheme(t)),
  });

  const { handleSubmit } = form;

  const handleSaveNewPassword = useCallback(
    (data: IFormItem) => {
      const payload: { password: string; token: string } = {
        password: '',
        token,
      };
      payload.password = data.newPassword;
      onResetPassword(payload)
        .then((data: any) => {
          // eslint-disable-next-line no-debugger
          debugger;

          if (!data.error) {
            Notification.success('Change password success');
            removeLocalStorage(STORAGE.USER_TOKEN);
            removeLocalStorage(STORAGE.USER_REFRESH);
            removeLocalStorage(STORAGE.USER_DATA);
            setTimeout(() => {
              navigate('/home');
            }, 3000);
          }
        })
        .catch(() => console.log('change password failure'));
    },
    [form],
  );

  return (
    <WrapperStyled>
      <div className="container">
        <div className="header-wrapper">
          <h3 id="header">RESET YOUR PASSWORD</h3>
        </div>
        <div id="form_change_password">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(handleSaveNewPassword)}>
              <FormPassword
                placeholder="New password"
                name="newPassword"
              />
              <FormPassword
                placeholder="Confirm password"
                name="confirmPassword"
              />
              <div className="controller">
                <Button
                  htmlType="submit"
                  className="btn"
                  type="primary">
                  Confirm reset password
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </WrapperStyled>
  );
};

export default ForgotPassword;
