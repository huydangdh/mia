import React, { createContext } from 'react';
import { MesUser } from '../store';

export const UserContext = createContext<MesUser>({
    id: '',
    userName: '',
    userToken: '',
    permissions: [],
    miscInfo: {},
    isAuthed: false
});

export const UserProvider = ({ children: JSX.Element }) => {

  return (
    <UserContext.Provider >
      {children}
    </UserContext.Provider>
  );
};
