import { Route, Redirect, Navigate } from 'react-router-dom';
import useMesAuth from '../hooks/useAuth';


const ProtectedRoute = ({ children }) => {
  const { mesUser, isLoading } = useMesAuth();
  if(isLoading) return <>Loading...</>
  if(!isLoading && mesUser.isAuthed) return children
  if(!isLoading && !mesUser.isAuthed) return <Navigate to={"/login"} />
};

export default ProtectedRoute;

