import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ErrorMessage from "../components/ErrorMessage.jsx";
import useAuth from "../hooks/useAuth.js";

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
    <section className="auth-card fade-in reveal-delay-1">
      <h1>Create account</h1>
      <p>Start building a private verification history.</p>
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
        <button className="button" disabled={isAuthLoading} type="submit">
          {isAuthLoading ? "Creating Account" : "Create Account"}
        </button>
      </form>
      <p className="form-link">
        Already registered? <Link to="/login">Sign in</Link>
      </p>
    </section>
  );
}
