import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';

const ProtectCustomer = ({ children }) => {
  const { user } = useAuthContext();

  if (!user?.email) {
    return <Navigate to={'/login'} replace />;
  }

  if (user?.role !== 'customer') {
    return <Navigate to={'/unauthorized'} replace />;
  }

  return children;
};

export default ProtectCustomer;
