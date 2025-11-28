// src/hooks/useSession.tsx
import { useState, useEffect } from "react";
import { LOCAL_STORAGE_SESSION_KEY } from "../utils/constants";
import { getJsonFromLocalStorage } from "../utils/localStorage";

export function useSession() {
  // Estado inicial: leer del localStorage (si ya estaba logueado)
  const [userSession, setUserSession] = useState(
    getJsonFromLocalStorage(LOCAL_STORAGE_SESSION_KEY)
  );
  const [isLogged, setIsLogged] = useState(userSession !== null);

  // 🧩 Recuperar sesión si se recarga la página
  useEffect(() => {
    const savedUser = getJsonFromLocalStorage(LOCAL_STORAGE_SESSION_KEY);
    const token = localStorage.getItem("auth_token");
    if (savedUser && token) {
      setUserSession(savedUser);
      setIsLogged(true);
    } else {
      setUserSession(null);
      setIsLogged(false);;;;
    }
  }, []);

  // ✅ Guardar usuario en sesión (después del login)
  const signIn = (user) => {
    setUserSession(user);
    setIsLogged(true);
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(user));
  };

  // 🚪 Cerrar sesión (logout)
  const signOut = () => {
    setUserSession(null);
    setIsLogged(false);
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    localStorage.removeItem("auth_token"); // borra también el token
  };

  const isAdmin = userSession?.role === "admin";

  return { userSession, isLogged, signIn, signOut };
}
