import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage.jsx";
import useAuth from "../hooks/useAuth.js";

export default function LoginPage() {
  const { authError, isAuthLoading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const routeError = location.state?.authError || "";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

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
    <section className="auth-card">
      <h1>Welcome back</h1>
      <p>Sign in to continue verification work.</p>
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
        <button className="button" disabled={isAuthLoading} type="submit">
          {isAuthLoading ? "Signing In" : "Sign In"}
        </button>
      </form>
      <p className="form-link">
        New to VeriLens? <Link to="/register">Create an account</Link>
      </p>
    </section>
  );
}
