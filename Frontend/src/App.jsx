import AppRoutes from "./routes/AppRoutes.jsx";
import PageTransition from "./components/PageTransition.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

export default function App() {
  return (
    <>
      <ThemeToggle />
      <PageTransition>
        <AppRoutes />
      </PageTransition>
    </>
  );
}
