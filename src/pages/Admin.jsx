import React, { useEffect, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/products";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagenUrl: ""
  });

  
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProducts().then((data) => setProducts(data));
  };

  const handleAddProduct = async () => {
    if (!newProduct.nombre || !newProduct.precio) {
      return alert("Completa al menos el nombre y el precio del producto");
    }

    await createProduct(newProduct);
    setNewProduct({ nombre: "", descripcion: "", precio: "", imagenUrl: "" });
    loadProducts();
  };

  const handleSaveEdit = async () => {
    await updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
    loadProducts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">PANEL DE ADMINISTRACIÓN</h1>


      <div className="card p-3 mb-4 shadow-sm">
        <h4>Agregar nuevo producto</h4>
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={newProduct.nombre}
              onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Descripción"
              value={newProduct.descripcion}
              onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Precio"
              value={newProduct.precio}
              onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="URL Imagen"
              value={newProduct.imagenUrl}
              onChange={(e) => setNewProduct({ ...newProduct, imagenUrl: e.target.value })}
            />
          </div>
          <div className="col-md-1">
            <button className="btn btn-success w-100" onClick={handleAddProduct}>Agregar</button>
          </div>
        </div>
      </div>


      <table className="table table-striped table-bordered shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                {p.imagenUrl ? (
                  <img src={p.imagenUrl} alt={p.nombre} width="60" />
                ) : (
                  <span className="text-muted">Sin imagen</span>
                )}
              </td>

              <td>
                {editingProduct?.id === p.id ? (
                  <input
                    className="form-control"
                    value={editingProduct.nombre}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, nombre: e.target.value })
                    }
                  />
                ) : (
                  p.nombre
                )}
              </td>

              <td>
                {editingProduct?.id === p.id ? (
                  <input
                    className="form-control"
                    value={editingProduct.descripcion}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, descripcion: e.target.value })
                    }
                  />
                ) : (
                  p.descripcion
                )}
              </td>

              <td>
                {editingProduct?.id === p.id ? (
                  <input
                    type="number"
                    className="form-control"
                    value={editingProduct.precio}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, precio: e.target.value })
                    }
                  />
                ) : (
                  `$${p.precio}`
                )}
              </td>

              <td>
                {editingProduct?.id === p.id ? (
                  <>
                    <button className="btn btn-success btn-sm me-2" onClick={handleSaveEdit}>
                      Guardar
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingProduct(null)}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingProduct(p)}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
