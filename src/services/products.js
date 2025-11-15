const API_URL = "http://localhost:8080/api/productos";

// 🔵 Obtener todos los productos
export async function getProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return await res.json();
}

// 🟩 Obtener producto por ID (GET)
export async function getProductById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto por ID");
  return await res.json();
}

// 🟢 Crear producto (POST)
export async function createProduct(product) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

  if (!res.ok) throw new Error("Error al crear producto");
  return await res.json();
}

// 🟡 Actualizar producto (PUT)
export async function updateProduct(id, product) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

  if (!res.ok) throw new Error("Error al actualizar producto");
  return await res.json();
}

// 🔴 Eliminar producto (DELETE)
export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Error al eliminar producto");
  return true;
}
