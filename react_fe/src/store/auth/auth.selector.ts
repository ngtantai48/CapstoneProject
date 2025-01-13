import { login, signUp } from './auth.action';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, actionType } = useSelector(
    (state: Types.IStoreState) => state.auth,
    shallowEqual,
  );
  const onLogin = useCallback(
    async (payload: Types.ILoginRequest) => {
      return await dispatch(login(payload));
    },
    [dispatch],
  );
  const onSignUp = useCallback(
    async (payload: Types.ISignUpRequest) => {
      return await dispatch(signUp(payload));
    },
    [dispatch],
  );
  return {
    onLogin,
    onSignUp,
    loading,
    actionType,
  };
};
