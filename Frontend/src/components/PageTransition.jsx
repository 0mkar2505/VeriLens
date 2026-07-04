import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
  const location = useLocation();
  const transitionKey = `${location.pathname}${location.search}${location.hash}`;

  return (
    <div className="page-transition-stage">
      <div className="page-wrapper route-fade-enter" key={transitionKey}>
        {children}
      </div>
    </div>
  );
}
