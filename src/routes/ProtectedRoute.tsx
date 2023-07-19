import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../api/supabase";
import { MesUser } from "../store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    let [isLoading, setLoading] = useState<boolean>(true)
    let [isAuth, setAuth] = useState<MesUser| null>(null)
    let {isAuthenticated, user} = useAuth()

    if(isLoading){
      if(!isAuthenticated) return <>Is Loading...</>
      
      else{
        setLoading(false)
      }
    }
    console.log(user)

    return <>Under development</>;
};

export default ProtectedRoute;

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then((userResponse)=>{
      setUser(userResponse.data.user)
      setIsAuthenticated(true)
      console.log(userResponse)
    })
  }, []);

  return {
    isAuthenticated,
    user,
  };
};
