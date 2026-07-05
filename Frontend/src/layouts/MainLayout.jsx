import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FileImage, FileText, History, LayoutDashboard, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import useAuth from "../hooks/useAuth.js";
import logoUrl from "../assets/images/VeriLens-Logo.svg";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/analyze/image", label: "Image Analysis", icon: FileImage },
  { to: "/analyze/text", label: "Text Analysis", icon: FileText },
  { to: "/history", label: "History", icon: History }
];

export default function MainLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className={`app-frame${isSidebarCollapsed ? " sidebar-collapsed" : ""}`}>
      <aside className="sidebar">
        <div className="sidebar-topbar">
          <NavLink className="sidebar-brand-lockup" to="/dashboard" aria-label="VeriLens dashboard">
            <span className="sidebar-brand-mark"><img className="brand-logo" src={logoUrl} alt="" /></span>
            <span className="sidebar-brand-copy">
              <span className="brand brand-sidebar">VeriLens</span>
              <span className="sidebar-caption">AI Content Verification</span>
            </span>
          </NavLink>

          <button
            className="sidebar-collapse-button"
            type="button"
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setIsSidebarCollapsed((value) => !value)}
          >
            {isSidebarCollapsed ? <PanelLeftOpen size={18} aria-hidden="true" /> : <PanelLeftClose size={18} aria-hidden="true" />}
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} title={isSidebarCollapsed ? item.label : undefined}>
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-chip" title={user?.email || "Signed in user"}>
            <span>{user?.email?.[0]?.toUpperCase() || "V"}</span>
            <strong>{user?.email || "Signed in"}</strong>
          </div>
          <button className="button button-secondary sidebar-logout-button" type="button" onClick={handleLogout}>
            <LogOut size={17} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="content-shell">
        <Outlet />
      </main>
    </div>
  );
}
