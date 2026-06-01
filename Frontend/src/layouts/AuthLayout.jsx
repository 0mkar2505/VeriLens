import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="auth-shell">
      <header className="auth-header">
        <Link className="brand" to="/">
          VeriLens
        </Link>
        <nav className="auth-nav" aria-label="Authentication">
          <Link to="/login">Login</Link>
          <Link className="button button-compact" to="/register">
            Register
          </Link>
        </nav>
      </header>
      <Outlet />
    </main>
  );
}
