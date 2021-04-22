import React, { useState, useEffect } from 'react';

import { AuthResultType } from 'pages/Auth/types';

import {
  UserDetailsType,
  AppContextType,
  AppContextDefaultValue,
} from './types';

export type AppContextProviderType = {
  children: React.ReactNode;
};

const AppContext = React.createContext<AppContextType>(AppContextDefaultValue);

export const AppContextProvider = ({ children }: AppContextProviderType) => {
  const [userDetails, setUserDetails] = useState<UserDetailsType>({
    email: '',
    name: '',
    isAuthenticated: false,
  });

  const updateAuthDetails = (data: AuthResultType): void => {
    const { email, name } = data;

    localStorage.setItem('AUTH_INFO', JSON.stringify(data));

    setUserDetails((prevState) => ({
      ...prevState,
      email,
      name,
      isAuthenticated: true,
    }));
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('AUTH_INFO');
    if (userInfo) {
      console.group(JSON.parse(userInfo), 'context');
      const { email, name } = JSON.parse(userInfo);
      setUserDetails((prevState) => ({
        ...prevState,
        email,
        name,
        isAuthenticated: true,
      }));
    }
  }, []);

  const providerValue: AppContextType = {
    data: {
      userDetails,
    },
    actions: { updateAuthDetails },
  };
  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};

export const AppContextConsumer = AppContext.Consumer;

export default AppContext;
