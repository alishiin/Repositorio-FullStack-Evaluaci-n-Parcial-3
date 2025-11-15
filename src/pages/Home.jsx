// @ts-nocheck

import { useEffect, useState } from "react";

import { Col, Container, Row, Button } from "react-bootstrap";

import Loading from "../components/Loading";

import ProductCard from "../components/ProductCard";

import { useNavigate, useSearchParams } from "react-router-dom";

import { ROUTE_PARAMS } from "../utils/constants";



function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ------------------------------
  // Cargar productos desde el backend
  // ------------------------------
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/productos");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ------------------------------
  // Agregar al carrito
  // ------------------------------
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} agregado al carrito`);
  };

  const buttonStyle = {
    backgroundColor: "#EC4899",
    border: "none",
    color: "white",
    width: "180px",
    fontWeight: "600",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
  };

  return (
    <>
      {/* Encabezado */}
      <div className="text-center my-5">
        <h1
          className="font-pacifico text-4xl md:text-6xl mb-3"
          style={{ color: "#ff00aeff" }}
        >
          Pastelería Momo&Virgo
        </h1>

        <h2 className="text-lg mb-3" style={{ color: "#000000" }}>
          Tortas artesanales para endulzar fantasmagoricamente tu día
        </h2>

        <div className="d-flex justify-content-center flex-wrap gap-3">
          <Button
            onClick={() => navigate("/nosotros")}
            className="mt-3 px-4 py-2 rounded-pill"
            style={buttonStyle}
          >
            Conócenos
          </Button>

          <Button
            onClick={() => navigate("/contacto")}
            className="mt-3 px-4 py-2 rounded-pill"
            style={buttonStyle}
          >
            Contáctanos
          </Button>

          <Button
            onClick={() => navigate("/carrito")}
            className="mt-3 px-4 py-2 rounded-pill"
            style={buttonStyle}
          >
            Carrito
          </Button>
        </div>
      </div>

      {/* Catálogo */}
      <Container className="mt-4">
        <Row className="align-items-stretch">
          {loading ? (
            <Loading />
          ) : (
            products
              .filter(
                (p) =>
                  !searchParams.get(ROUTE_PARAMS.SEARCH) ||
                  p.name
                    .toLowerCase()
                    .includes(
                      searchParams
                        .get(ROUTE_PARAMS.SEARCH)
                        .toLowerCase()
                    )
              )
              .map((product) => (
                <Col key={product.id} xs={12} sm={6} md={4} className="mb-4">
                  <ProductCard
                    name={product.nombre}
                    price={product.precio}
                    description={product.descripcion}
                    image={product.imagenUrl}
                    action={() => addToCart(product)}
                    actionName="Encargar"
                    style={{ color: "#6B5B95" }}
                  />
                </Col>
              ))
          )}
        </Row>
      </Container>
    </>
  );
}

export default Home;
