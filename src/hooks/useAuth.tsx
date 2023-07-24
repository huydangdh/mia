import React, { useEffect, useMemo, useState } from "react";
import store, { MesUser, resetUser, setUser, useMesSelector } from "../store";
import supabase from "../api/supabase";

import { useContext, createContext } from 'react';

export type AuthContextType = {
  user: MesUser | null;
  signin: (email: string, password: string) => Promise<MesUser>;
  signout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<MesUser>;
};

const defaultAuthContextValue: AuthContextType = {
  user: null,
  signin: async (email: string, password: string) => {
    throw new Error('AuthProvider not initialized');
  },
  signout: async () => {
    throw new Error('AuthProvider not initialized');
  },
  signup: async (email: string, password: string) => {
    throw new Error('AuthProvider not initialized');
  },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);


function useMesAuth() {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const user = useMesSelector((s) => s.mesUserState.user)
  const [isLoading, setLoading] = useState<boolean>(false)

  // Memoize the context value to prevent re-renders caused by AuthProvider
  const signin = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;
    setUser(user);
    return user;
  };

  const signout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const signup = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    setUser(user);
    return user;
  };

  useEffect(() => {
    supabase.auth.getSession().then((res) => {
      let _user = res.data.session?.user;
      if (_user) {
        store.dispatch(setUser({
          id: _user?.id,
          isAuthed: true,
          userName: _user?.email,
          userToken: "<userToken>",
          miscInfo: {},
          permissions: []
        }))
      }

      const { data: listener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_OUT') store.dispatch(resetUser());
          if (event === 'SIGNED_IN') {
            let _user = session?.user
            store.dispatch(setUser({
              id: _user?.id,
              userName: _user?.email,
              userToken: session?.access_token,
              isAuthed: true,
              permissions: [],
              miscInfo: {}
            }))
          }

        }
      );
      return () => {
        listener.subscription.unsubscribe();
      };
    })
  }, []);

  const contextValue = useMemo<AuthContextType>(() => {
    return {
      user,
      signin,
      signout,
      signup,
    }
  }, [user])


  return contextValue;
}


export function AuthProvider({ children }: { children: React.ReactElement }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default useMesAuth
