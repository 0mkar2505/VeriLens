import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add("page-transition");
    setIsVisible(true);

    return () => {
      document.body.classList.remove("page-transition");
    };
  }, []);

  useLayoutEffect(() => {
    setIsVisible(false);
    const timeout = window.setTimeout(() => setIsVisible(true), 90);

    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className={`page-wrapper ${isVisible ? "is-visible" : "is-hidden"}`}>
      {children}
    </div>
  );
}
