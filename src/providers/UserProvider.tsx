import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import store, { AppDispatch, initUser, MesUser, setLoading, setUser } from '../store';
import localforage from 'localforage';
import { MyContext } from '../main';

export function UserInitialized() {
  let _tmp: any = undefined;
  localforage.getItem<MesUser>("sv_MesUser", (err, value)=>{
    if(value != undefined){ 
      _tmp = value
      store.dispatch(setUser(_tmp))
      store.dispatch(setLoading(false))
    }

    console.log(`[I] sv_MesUser: ${err}, ${JSON.stringify(value)} + ${new Date().getTime()}`);
    
  });
  console.log(`[I] MainPage_UserInit : ${new Date().getTime()}`)
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const _mesUser = store.getState().mesUserStore
  
  useEffect(()=>{
    UserInitialized()
  })


  return (
    <MyContext.Provider value={_mesUser}>
      {children}
    </MyContext.Provider>
  );
};
