import React, { createContext, ReactNode } from 'react';
import { MesUser } from '../store';

export const UserContext = createContext<MesUser>({
    id: '',
    userName: '',
    userToken: '',
    permissions: [],
    miscInfo: {},
    isAuthed: false
});

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
 

  
  return (
    <UserContext.Provider >
      {children}
    </UserContext.Provider>
  );
};
