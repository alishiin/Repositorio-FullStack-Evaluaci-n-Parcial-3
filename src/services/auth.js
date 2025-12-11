

const API_URL = "https://full-stack-auth-master.onrender.com";
const API_KEY = "66a580b5fe24a10542b34269855e915e";


export async function register(username, password) {
  const res = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      email: username,
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

  return res.json();
}


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

  
  const isAdmin = data.user.email === "admin@pasteleria.com";

  const user = {
    ...data.user,
    isAdmin, 
  };

  
  localStorage.setItem("auth_token", data.token);
  localStorage.setItem("current_user", JSON.stringify(user));

  return user;
}


export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("current_user"));
}


export function signOut() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("current_user");
}
