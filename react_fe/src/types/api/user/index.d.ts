declare namespace Types {
  interface IChangePasswordRequest {
    currentPassword: string;
    password: string;
  }
  interface IResetPasswordRequest {
    password: string;
    token: string;
  }
  interface IForgotPasswordRequest {
    email: string;
  }
  interface IUpdateUserInfo {
    avatar?: string;
    name?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    birthday?: any;
    email?: string;
    phone?: string;
  }
  interface IUpdateSkill {
    major: string;
    years_exp: number;
    skill: Array<string>;
    city: string;
    level: string;
  }
  interface IMailSubscribe {
    email: string;
  }
}
