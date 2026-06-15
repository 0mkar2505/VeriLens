import { Link } from "react-router-dom";

export default function PublicNav() {
  return (
    <nav className="public-nav" aria-label="Primary navigation">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/features">Features</Link>
      <Link to="/pricing">Pricing</Link>
      <Link className="button button-compact button-secondary" to="/login">Sign In</Link>
      <Link className="button button-compact" to="/register">Register</Link>
    </nav>
  );
}
