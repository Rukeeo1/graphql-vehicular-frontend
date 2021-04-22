import { AuthResultType } from 'pages/Auth/types';

export type UserDetailsType = {
  email: string;
  name?: string;
  isAuthenticated: boolean;
};

export type AppContextType = {
  data: {
    userDetails: UserDetailsType;
  };
  actions: { updateAuthDetails: (data: AuthResultType) => void };
};

export const AppContextDefaultValue = {
  data: {
    userDetails: { email: '', isAuthenticated: false },
  },
  actions: {
    updateAuthDetails: () => undefined,
  },
};
