import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Administrator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/mine/admin') {
      navigate('editdonation', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Administrator;
