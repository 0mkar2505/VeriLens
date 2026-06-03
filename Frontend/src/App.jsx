import AppRoutes from "./routes/AppRoutes.jsx";
import PageTransition from "./components/PageTransition.jsx";

export default function App() {
  return (
    <PageTransition>
      <AppRoutes />
    </PageTransition>
  );
}
