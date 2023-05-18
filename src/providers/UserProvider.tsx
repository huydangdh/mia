import React, { createContext, ReactNode, useEffect } from 'react';
import { AppDispatch, initUser, MesUser } from '../store';
import { useDispatch } from 'react-redux';

export const UserContext = createContext<any>({});

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const dispatch : AppDispatch = useDispatch()
  useEffect(()=>{
    dispatch(initUser())
  })


  return (
    <UserContext.Provider value={{}}>
      {children}
    </UserContext.Provider>
  );
};
