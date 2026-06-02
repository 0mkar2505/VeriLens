import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";

export default function ProtectedRoute() {
  const { authError, isAuthenticated, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) {
    return (
      <div className="full-page-loader">
        <span>Loading VeriLens</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          authError
        }}
      />
    );
  }

  return <Outlet />;
}
