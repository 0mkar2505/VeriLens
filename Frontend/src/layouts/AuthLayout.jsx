import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MarketingFooter from "../components/MarketingFooter.jsx";
import PublicNav from "../components/PublicNav.jsx";

const marketingRoutes = new Set(["/", "/about", "/features", "/pricing"]);
const authRoutes = new Set(["/login", "/register"]);

export default function AuthLayout() {
  const { pathname } = useLocation();
  const showMarketingFooter = marketingRoutes.has(pathname);
  // reveal content after mount
  useEffect(() => {
    const t = setTimeout(() => document.documentElement.classList.add("content-loaded"), 60);
    return () => clearTimeout(t);
  }, []);

  // when route changes, ensure the page is scrolled to top and retrigger the reveal
  useEffect(() => {
    document.documentElement.classList.remove("content-loaded");
    window.scrollTo({ top: 0, left: 0 });
    const t = setTimeout(() => document.documentElement.classList.add("content-loaded"), 90);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <>
      {/* Hide header on auth routes */}
      {!authRoutes.has(pathname) && (
        <header className={`auth-header auth-header--compact`}>
          <div className="auth-header-inner container">
            <Link className="brand" to="/">
              VeriLens
            </Link>
            <PublicNav />
          </div>
        </header>
      )}

      <main className={`auth-shell ${authRoutes.has(pathname) ? "auth-shell--full" : ""}`}>
        {authRoutes.has(pathname) ? (
          // Full-bleed auth pages (no container)
          <Outlet />
        ) : (
          <div className="container">
            <Outlet />
          </div>
        )}

        {showMarketingFooter && !authRoutes.has(pathname) && <MarketingFooter />}
      </main>
    </>
  );
}
