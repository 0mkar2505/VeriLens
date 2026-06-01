import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import {
  fetchCurrentUser,
  loginUser,
  registerUser
} from "../services/authService.js";
import {
  getStoredToken,
  removeStoredToken,
  setStoredToken
} from "../utils/tokenStorage.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const hydrateUser = useCallback(async () => {
    if (!getStoredToken()) {
      setIsBootstrapping(false);
      return;
    }

    try {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
    } catch {
      removeStoredToken();
      setUser(null);
    } finally {
      setIsBootstrapping(false);
    }
  }, []);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  const login = useCallback(async (credentials) => {
    const data = await loginUser(credentials);
    setStoredToken(data.access_token);
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const data = await registerUser(payload);
    setStoredToken(data.access_token);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    removeStoredToken();
    setUser(null);
  }, []);

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isBootstrapping,
    login,
    register,
    logout
  }), [isBootstrapping, login, logout, register, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
