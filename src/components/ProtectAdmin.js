import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';

const ProtectAdmin = ({ children }) => {
  const { user } = useAuthContext();

  if (!user?.email) {
    return <Navigate to={'/login'} replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to={'/unauthorized'} replace />;
  }

  return children;
};

export default ProtectAdmin;
