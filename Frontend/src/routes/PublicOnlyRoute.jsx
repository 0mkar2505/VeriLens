import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";

export default function PublicOnlyRoute() {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <div className="full-page-loader">Loading VeriLens</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
