import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuth = () => {
  const token = Cookies.get("accessKey")
  const location = useLocation();

  return token
  ? <Outlet />
   : <Navigate to="/" state={{ from: location }} replace />;
};

export default RequireAuth;
