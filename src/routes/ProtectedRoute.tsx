import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../api/supabase";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated && !user) {
    return <>Under development</>;
  }

  return children;
};

export default ProtectedRoute;

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

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
