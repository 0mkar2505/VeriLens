import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";

export default function ProtectedRoute() {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return <div className="full-page-loader">Loading VeriLens</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
