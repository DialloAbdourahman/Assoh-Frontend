import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';

const ProtectCustomerOrUnauth = ({ children }) => {
  const { user } = useAuthContext();

  if (!user?.email || user?.role !== 'seller') {
    return children;
  }

  return <Navigate to={'/unauthorized'} replace />;
};

export default ProtectCustomerOrUnauth;
