import { useCallback, useEffect, useMemo, useState } from "react";

import { AuthContext } from "./AuthContextObject.js";
import {
  fetchCurrentUser,
  loginUser,
  registerUser
} from "../services/authService.js";
import { AUTH_LOGOUT_EVENT } from "../utils/authEvents.js";
import {
  getStoredToken,
  removeStoredToken,
  setStoredToken
} from "../utils/tokenStorage.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const hydrateUser = useCallback(async () => {
    setAuthError("");

    if (!getStoredToken()) {
      setUser(null);
      setIsBootstrapping(false);
      return;
    }

    try {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
    } catch (error) {
      removeStoredToken();
      setUser(null);
      setAuthError(
        error.response?.data?.detail || "Your session could not be restored."
      );
    } finally {
      setIsBootstrapping(false);
    }
  }, []);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  useEffect(() => {
    function handleForcedLogout() {
      setUser(null);
      setAuthError("Your session has expired. Please sign in again.");
    }

    window.addEventListener(AUTH_LOGOUT_EVENT, handleForcedLogout);

    return () => {
      window.removeEventListener(AUTH_LOGOUT_EVENT, handleForcedLogout);
    };
  }, []);

  const login = useCallback(async (credentials) => {
    setIsAuthLoading(true);
    setAuthError("");

    try {
      const data = await loginUser(credentials);
      setStoredToken(data.access_token);

      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      const message = error.response?.data?.detail || "Unable to sign in.";
      setAuthError(message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setIsAuthLoading(true);
    setAuthError("");

    try {
      const data = await registerUser(payload);
      setStoredToken(data.access_token);

      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      const message = error.response?.data?.detail || "Unable to create account.";
      setAuthError(message);
      throw error;
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    removeStoredToken();
    setUser(null);
    setAuthError("");
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isBootstrapping,
    isAuthLoading,
    authError,
    login,
    register,
    hydrateUser,
    logout
  }), [
    authError,
    hydrateUser,
    isAuthLoading,
    isBootstrapping,
    login,
    logout,
    register,
    user
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
