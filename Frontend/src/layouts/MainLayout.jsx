import { NavLink, Outlet, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth.js";

export default function MainLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-frame">
      <aside className="sidebar">
        <div>
          <div className="brand brand-sidebar">VeriLens</div>
          <p className="sidebar-caption">AI Content Verification</p>
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/analyze/image">Image Analysis</NavLink>
          <NavLink to="/analyze/text">Text Analysis</NavLink>
          <NavLink to="/history">History</NavLink>
        </nav>

        <div className="sidebar-footer">
          <span>{user?.email}</span>
          <button className="button button-secondary" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="content-shell">
        <Outlet />
      </main>
    </div>
  );
}
