import { useEffect, useState } from "react";
import { getSession, logout, type User } from "../api/auth.api";

export function useAuth() {
  const [{ user, token }, setState] = useState<{ user: User | null; token: string | null }>(() => getSession());

  useEffect(() => {
    const onStorage = () => setState(getSession());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    reload: () => setState(getSession()),
    logout,
  };
}
