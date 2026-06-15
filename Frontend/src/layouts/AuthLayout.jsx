import { Link, Outlet } from "react-router-dom";
import PublicNav from "../components/PublicNav.jsx";

export default function AuthLayout() {
  return (
    <main className="auth-shell">
      <header className="auth-header">
        <Link className="brand" to="/">
          VeriLens
        </Link>
        <PublicNav />
      </header>
      <Outlet />
    </main>
  );
}
