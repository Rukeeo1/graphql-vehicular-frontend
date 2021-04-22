export type AuthResultType = {
  email: string;
  name?: string;
  token: string;
};

export type LoginResultType = {
  login: AuthResultType;
};

export type SignUpResultType = {
  signUp: AuthResultType;
};
