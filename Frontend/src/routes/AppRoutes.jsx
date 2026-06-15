import { Navigate, Route, Routes } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import HistoryPage from "../pages/HistoryPage.jsx";
import ImageAnalysisPage from "../pages/ImageAnalysisPage.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import TextAnalysisPage from "../pages/TextAnalysisPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import FeaturesPage from "../pages/FeaturesPage.jsx";
import PricingPage from "../pages/PricingPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import PublicOnlyRoute from "./PublicOnlyRoute.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analyze/image" element={<ImageAnalysisPage />} />
          <Route path="/analyze/text" element={<TextAnalysisPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
