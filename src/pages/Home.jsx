// @ts-nocheck

import { useEffect, useState } from "react";

import { Col, Container, Row, Button } from "react-bootstrap";
import { useSession } from "../hooks/useSession";

import Loading from "../components/Loading";

import ProductCard from "../components/ProductCard";

import { useNavigate, useSearchParams } from "react-router-dom";

import { ROUTE_PARAMS } from "../utils/constants";



function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userSession } = useSession();

  const [showDenied, setShowDenied] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchProducts = async () => {
    try {
      const res = await fetch("https://api-productos-pasteleria.onrender.com/api/productos");
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


  const addToCart = (product) => {
    // Si es admin, bloquear la acción
    const isAdmin = userSession?.isAdmin || userSession?.role === 'admin';
    if (isAdmin) {
      setShowDenied(true);
      // ocultar después de 1.8s
      setTimeout(() => setShowDenied(false), 1800);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    // Mostrar toast estandarizado (sin el 'localhost dice ...')
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1800);
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


      <Container className="mt-4">
        <Row className="align-items-stretch">
          {loading ? (
            <Loading />
          ) : (
            products
              .filter((p) => {
                const search = searchParams.get(ROUTE_PARAMS.SEARCH)?.toLowerCase() || "";
                return (
                  search === "" ||
                  p.nombre?.toLowerCase().includes(search) ||
                  p.descripcion?.toLowerCase().includes(search)
                );
              })

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

      {/* Toast animado para acción denegada a admin */}
      {showDenied && (
        <div className="admin-denied-toast animate-fade-up" role="status" aria-live="polite">
          Acción denegada para admin
        </div>
      )}

      {/* Toast estándar al agregar al carrito */}
      {showAdded && (
        <div className="cart-added-toast animate-fade-up" role="status" aria-live="polite">
          Producto agregado al carrito
        </div>
      )}
    </>
   );
 }

 export default Home;
