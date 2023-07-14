import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';

const ProtectSeller = ({ children }) => {
  const { user } = useAuthContext();

  if (!user?.email) {
    return <Navigate to={'/login'} replace />;
  }

  if (user?.role !== 'seller') {
    return <Navigate to={'/unauthorized'} replace />;
  }

  return children;
};

export default ProtectSeller;
