// components/ProtectedRouter.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useMesAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRouter: React.FC<ProtectedRouteProps> = ({
  children
}) => {
  const { user, isLoading } = useMesAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (user.isAuthed) return children
  else return <Navigate to="/login" />
};

export default ProtectedRouter;

