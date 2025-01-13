import * as yup from 'yup';
import { TFunction } from 'i18next';

const loginScheme = (t: TFunction) =>
  yup.object().shape({
    email: yup
      .string()
      .email(
        t('error_message:validation.invalid_email', {
          key: t('common:auth.email'),
        }),
      )
      .trim()
      .required(
        t('error_message:validation.required', {
          key: t('common:auth.email'),
        }),
      )
      .max(
        200,
        t('error_message:validation.max_length', {
          key: t('common:auth.email'),
          max: 200,
        }),
      ),
    password: yup
      .string()
      .trim()
      .required(
        t('error_message:validation.required', {
          key: t('common:auth.password'),
        }),
      )
      .min(
        8,
        t('error_message:validation.min_length', {
          key: t('common:auth.password'),
          min: 8,
        }),
      )
      .max(
        32,
        t('error_message:validation.max_length', {
          key: t('common:auth.password'),
          max: 32,
        }),
      ),
  });

const signUpScheme = (t: TFunction) =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(
        t('error_message:validation.required', {
          key: t('common:auth.name'),
        }),
      )
      .max(
        255,
        t('error_message:validation.max_length', {
          key: t('common:auth.name'),
          max: 255,
        }),
      ),
    email: yup
      .string()
      .email(
        t('error_message:validation.invalid_email', {
          key: t('common:auth.email'),
        }),
      )
      .trim()
      .required(
        t('error_message:validation.required', {
          key: t('common:auth.email'),
        }),
      )
      .max(
        200,
        t('error_message:validation.max_length', {
          key: t('common:auth.email'),
          max: 200,
        }),
      ),
    password: yup
      .string()
      .trim()
      .required(
        t('error_message:validation.required', {
          key: t('common:auth.password'),
        }),
      )
      .min(
        8,
        t('error_message:validation.min_length', {
          key: t('common:auth.password'),
          min: 8,
        }),
      )
      .max(
        32,
        t('error_message:validation.max_length', {
          key: t('common:auth.password'),
          max: 32,
        }),
      ),
  });

export { loginScheme, signUpScheme };
