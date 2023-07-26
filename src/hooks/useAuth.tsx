import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMesSelector, setUser, resetUser } from '../store';
import supabase from '../api/supabase';
import { User } from '@supabase/supabase-js';
import { MM_APPLICATION_ID } from '../api/mes_app/PermissionsAPI';

// Define the type for the user object


// Define the types for the authentication functions
type SignUpFunction = (email: string, password: string) => Promise<User | null>;
type SignInFunction = (email: string, password: string) => Promise<User | null>;
type SignOutFunction = () => Promise<void>;

const useMesAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useMesSelector((state) => state.mesUserState.user || {});

  const handleAuthError = (error: Error) => {
    throw new Error(error.message);
  };

  // Function to sign up a new user
  const signUp: SignUpFunction = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) handleAuthError(error);
      return data.user;
    } catch (error) {
      handleAuthError(error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  };

  // Function to log in an existing user
  const signIn: SignInFunction = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) handleAuthError(error);
      return data.user;
    } catch (error) {
      handleAuthError(error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  };

  // Function to log out the current user
  const signOut: SignOutFunction = async () => {
    try {
      await supabase.auth.signOut();
      dispatch(resetUser());
    } catch (error) {
      handleAuthError(error);
      throw error; // Re-throw the error to propagate it to the caller
    }
  };

  // Function to check if the user is logged in and fetch user data
  const checkUser = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) handleAuthError(error);

      if (data?.session != null) {
        const { id, email } = data.session.user;
        dispatch(
          setUser({
            id,
            userName: email,
            userToken: data.session.access_token,
            isAuthed: true,
            miscInfo: {},
            permissions: [{
              appID: MM_APPLICATION_ID.WorkTimeAdd,
              appName: "WorkTimeAdd",
              appPermission: "RUN^CREATE^READ"
            },
            {
              appID: MM_APPLICATION_ID.WorkTimeQuery,
              appName: "WorkTimeRecordQuery",
              appPermission: ""
            }],
          })
        );
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (isLoading) {
    // Show loading state if still fetching user data
  }

  return {
    user,
    checkUser,
    isLoading,
    signUp,
    signIn,
    signOut,
  };
};

export default useMesAuth;
