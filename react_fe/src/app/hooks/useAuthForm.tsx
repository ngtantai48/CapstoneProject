import AuthForm from '@components/auth';
import { useCallback, useState } from 'react';
const useAuthForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const openAuthForm = useCallback((isSignIn: boolean) => {
    setIsOpen(true);
    setIsSignIn(isSignIn);
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AuthFormElement = useCallback((): any => {
    return isOpen ? (
      <AuthForm
        isSignIn={isSignIn}
        closeFunc={() => setIsOpen(false)}
      />
    ) : (
      <></>
    );
  }, [isOpen, isSignIn]);
  return { openAuthForm, AuthFormElement };
};

export default useAuthForm;
