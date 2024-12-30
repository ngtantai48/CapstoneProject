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
    currentPassword: yup
      .string()
      .trim()
      .required(
        t('error_message:validation.required', {
          key: t('common:auth.current_password'),
        }),
      )
      .min(
        8,
        t('error_message:validation.min_length', {
          key: t('common:auth.current_password'),
          min: 8,
        }),
      )
      .max(
        32,
        t('error_message:validation.max_length', {
          key: t('common:auth.current_password'),
          max: 32,
        }),
      ),
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

interface Props {
  setIsShowChangePassword: (isShow: boolean) => void;
}

interface IFormItem {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = ({ setIsShowChangePassword }: Props) => {
  const { t } = useTranslation(['common']);
  const { onChangePassword } = useUser();
  const navigate = useNavigate();

  const form = useForm<IFormItem>({
    resolver: yupResolver(scheme(t)),
  });

  const { handleSubmit } = form;

  const handleSaveNewPassword = useCallback(
    (data: IFormItem) => {
      const payload: { password: string; currentPassword: string } = {
        password: '',
        currentPassword: '',
      };
      payload.currentPassword = data.currentPassword;
      payload.password = data.newPassword;
      onChangePassword(payload)
        .then((data: any) => {
          if (!data.error) {
            Notification.success('Change password success');
            removeLocalStorage(STORAGE.USER_TOKEN);
            removeLocalStorage(STORAGE.USER_REFRESH);
            removeLocalStorage(STORAGE.USER_DATA);
            navigate(0);
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
          <h3 id="header">CHANGE PASSWORD</h3>
        </div>
        <div id="form_change_password">
          <FormProvider {...form}>
            <form onSubmit={handleSubmit(handleSaveNewPassword)}>
              <FormPassword
                placeholder="Current password"
                name="currentPassword"
              />
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
                  className="btn"
                  onClick={() => setIsShowChangePassword(false)}>
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  className="btn"
                  type="primary">
                  Save
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </WrapperStyled>
  );
};

export default ChangePassword;
