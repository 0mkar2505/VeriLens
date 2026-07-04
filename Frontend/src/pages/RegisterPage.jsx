import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage.jsx";
import useAuth from "../hooks/useAuth.js";
import AuthPanel from "../components/AuthPanel.jsx";

export default function RegisterPage() {
  const { authError, isAuthLoading, register } = useAuth();
  const navigate = useNavigate();
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
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to create account.");
    }
  }

  return (
    <AuthPanel title="Create account" subtitle="Start building a private verification history." imageUrl="https://images.unsplash.com/photo-1526401281623-6b01a8b4b3b6?auto=format&fit=crop&w=1600&q=80" position="left">
      <ErrorMessage message={error || authError} />
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
            autoComplete="new-password"
            minLength={8}
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
        </div>
        <button className="button" disabled={isAuthLoading} type="submit">
          {isAuthLoading ? "Creating Account" : "Create Account"}
        </button>

        <div className="auth-divider">Or continue with</div>
        <button type="button" className="button button-ghost auth-social">
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" style={{width:18,height:18,marginRight:8}} /> Continue with Google
        </button>
      </form>
      <p className="form-link">
        Already registered? <Link to="/login">Sign in</Link>
      </p>
    </AuthPanel>
  );
}
