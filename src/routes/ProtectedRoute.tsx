import { useEffect, useState } from "react";
import supabase from "../api/supabase";
import store, { MesUser, setUser, useMesSelector } from "../store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  let [isLoading, setLoading] = useState<boolean>(true)
  let { mesUser } = useAuth()
  //let mesUser = useMesSelector((state) => state.mesUserState.user)
  console.log('[i] user: ', mesUser)
  if (isLoading) {
    if (!mesUser.isAuthed) return <>Is Loading...</>

    else {
      setLoading(false)
    }
  }
  return <>Under development</>;
};

export default ProtectedRoute;

export const useAuth = () => {
  const mesUser = useMesSelector((s) => s.mesUserState.user)

  useEffect(() => {
    supabase.auth.getUser().then((userResponse) => {
      let _user = userResponse.data.user;
      if (_user) {
        store.dispatch(setUser({
          id: _user?.id,
          isAuthed: true,
          userName: _user?.email,
          userToken: "<userToken>",
          miscInfo: {},
          permissions: [{}]
        }))
      }
    })
  }, []);

  return {
    mesUser
  };
};
