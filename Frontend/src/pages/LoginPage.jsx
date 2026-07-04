import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage.jsx";
import useAuth from "../hooks/useAuth.js";
import AuthPanel from "../components/AuthPanel.jsx";

export default function LoginPage() {
  const { authError, isAuthLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const routeError = location.state?.authError || "";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (error && (form.email || form.password)) {
      setError("");
    }
  }, [form.email, form.password, error]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await login(form);
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to sign in.");
    }
  }

  return (
    <AuthPanel title="Welcome" subtitle="Access your account and continue your journey with us" imageUrl="https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80">
      <ErrorMessage message={error || routeError || authError} />
      <form className="form-stack" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            autoComplete="email"
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>
        <label>
          Password
          <input
            autoComplete="current-password"
            required
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
        </label>
        <div className="auth-row auth-row--actions">
          <label className="checkbox-inline">
            <input type="checkbox" /> Keep me signed in
          </label>
          <a className="link-muted" href="#">Reset password</a>
        </div>
        <button className="button" disabled={isAuthLoading} type="submit">
          {isAuthLoading ? "Signing In" : "Sign In"}
        </button>

        <div className="auth-divider">Or continue with</div>
        <button type="button" className="button button-ghost auth-social">
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" style={{width:18,height:18,marginRight:8}} /> Continue with Google
        </button>
      </form>
      <p className="form-link">
        New to VeriLens? <Link to="/register">Create an account</Link>
      </p>
    </AuthPanel>
  );
}
