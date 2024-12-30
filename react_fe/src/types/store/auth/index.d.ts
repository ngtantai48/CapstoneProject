declare namespace Types {
  enum ERole {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }
  interface IAuthState {
    actionType: string;
    loading: boolean;
    loginInProgress: boolean;
    signupProcess: boolean;
    accessTokenVerify: string;
    isVerified: boolean;
    email: string;
    role: ERole | undefined;
    userName: string;
  }
}
