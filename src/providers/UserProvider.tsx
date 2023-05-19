import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import store, { AppDispatch, initUser, MesUser, setUser } from '../store';
import { useDispatch } from 'react-redux';
import localforage from 'localforage';
import { MyContext } from '../main';

export function UserInitialized() {
  let _tmp: any = undefined;
  localforage.getItem<MesUser>("sv_MesUser", (err, value)=>{
    if(value != undefined){ 
      _tmp = value
      store.dispatch(setUser(_tmp))
    }

    console.log(`[I] sv_MesUser: ${err}, ${value}`);
    
  });
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const _mesUser = store.getState().mesUserStore.user
  useEffect(()=>{
    UserInitialized()
  })


  return (
    <MyContext.Provider value={_mesUser}>
      {children}
    </MyContext.Provider>
  );
};
