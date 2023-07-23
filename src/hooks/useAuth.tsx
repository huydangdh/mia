import { useEffect, useState } from "react";
import store, { setUser, useMesSelector } from "../store";
import supabase from "../api/supabase";

import { useContext, createContext } from 'react';
import { User } from "@supabase/supabase-js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useMesAuth() {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<boolean | User | undefined>(null);

  const signin = async (email, password) => {
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
    setUser(false);
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
      setUser(res.data.session?.user ?? false);
      const { data: listener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_OUT') setUser(false);
          else setUser(session?.user);
        }
      );
      return () => {
        listener.subscription.unsubscribe();
      };
    })
  }, []);

  return {
    user,
    signin,
    signout,
    signup,
  };
}


const useMesxAuth = () => {
  const mesUser = useMesSelector((s) => s.mesUserState.user)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    if (mesUser.isAuthed) {
      return
    }
    supabase.auth.getUser().then((userResponse) => {
      let _user = userResponse.data.user;
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

      setLoading(false)
    })
  }, []);

  return {
    mesUser, isLoading
  };
};


export default useMesAuth
