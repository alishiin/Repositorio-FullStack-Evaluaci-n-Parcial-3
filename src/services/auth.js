// src/services/auth.js

const API_URL = "https://full-stack-auth-need.onrender.com";
const API_KEY = "66a580b5fe24a10542b34269855e915e"; // Tu API_KEY real

// ✅ Registrar usuario
export async function register(username, password) {
  const res = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      email: username, // La API usa 'email', no 'username'
      password,
      extraInfo: "registro desde pasteleria react",
    }),
  });

  if (!res.ok) {
    let errorMsg = "Error al registrar usuario";
    try {
      const error = await res.json();
      errorMsg = error.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  return res.json(); // Devuelve el usuario creado
}

// ✅ Iniciar sesión
export async function signIn(username, password) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ email: username, password }),
  });

  if (!res.ok) {
    let errorMsg = "Credenciales inválidas";
    try {
      const error = await res.json();
      errorMsg = error.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  const data = await res.json();

  // 👇 Detectamos si es el administrador (para ProtectedRoute)
  const isAdmin = data.user.email === "admin@pasteleria.com";

  const user = {
    ...data.user,
    isAdmin, // ✅ esto es lo que ProtectedRoute usa
  };

  // Guarda token y usuario actual
  localStorage.setItem("auth_token", data.token);
  localStorage.setItem("current_user", JSON.stringify(user));

  return user;
}

// ✅ Obtener usuario actual
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("current_user"));
}

// ✅ Cerrar sesión
export function signOut() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("current_user");
}
