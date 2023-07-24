import { Navigate } from 'react-router-dom';
import useMesAuth from '../hooks/useAuth';
import LoginPage from '../pages/Login';
import { APP_URL } from '../dataMock';


const ProtectedRoute = ({ children }) => {
  const { user } = useMesAuth();
  console.log(user);
  if (!user?.isAuthed) return <Navigate to={APP_URL.LOGIN_PAGE} />
  else return children
};

export default ProtectedRoute;

