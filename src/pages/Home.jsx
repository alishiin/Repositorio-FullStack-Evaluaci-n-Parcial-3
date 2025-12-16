// @ts-nocheck

import { useEffect, useState, useRef } from "react";

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

  // Ribbon dinámico
  const [ribbonItems, setRibbonItems] = useState([]);
  const ribbonItemWidth = 260; // debe coincidir con CSS min-width

  const [showDenied, setShowDenied] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // RECOMMENDATIONS (carousel)
  const recoRef = useRef(null);
  const [recoIndex, setRecoIndex] = useState(0);
  const [recoAnimating, setRecoAnimating] = useState(false);


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

  // construir items de la cinta de forma dinámica para cubrir el ancho de la pantalla
  useEffect(() => {
    const build = () => {
      const vw = window.innerWidth || document.documentElement.clientWidth;
      // cuantos items únicos necesitamos para cubrir al menos el ancho de la ventana + margen
      const count = Math.max(4, Math.ceil(vw / ribbonItemWidth) + 3);
      const base = Array.from({ length: count }, () => ({
        text: 'Momo&Virgo te desean feliz navidad'
      }));
      // duplicar
      const seq = [...base, ...base];
      setRibbonItems(seq);
    };

    build();
    window.addEventListener('resize', build);
    return () => window.removeEventListener('resize', build);
  }, []);

  // carousel auto-advance
  useEffect(() => {
    const recoCount = Math.min(6, products.length);
    if (recoCount <= 1) return;
    const t = setInterval(() => {
      setRecoIndex((i) => (i + 1) % recoCount);
    }, 4000);
    return () => clearInterval(t);
  }, [products]);

  // activar animación cuando cambie el índice del carrusel
  useEffect(() => {
    const recoCount = Math.min(6, products.length);
    if (recoCount === 0) return;
    setRecoAnimating(true);
    const timer = setTimeout(() => setRecoAnimating(false), 420);
    return () => clearTimeout(timer);
  }, [recoIndex, products.length]);


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

  const christmasButtonStyle = {
    border: 'none',
    color: '#fff',
    fontWeight: 700,
    padding: '10px 18px',
    borderRadius: '28px',
    boxShadow: '0 8px 24px rgba(30,120,60,0.12)'
  }

  const recoProducts = products.slice(0, 6);

  const goToReco = () => {
    if (recoRef.current) {
      recoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const prevReco = () => {
    setRecoIndex((i) => (i - 1 + recoProducts.length) % Math.max(1, recoProducts.length));
  };

  const nextReco = () => {
    setRecoIndex((i) => (i + 1) % Math.max(1, recoProducts.length));
  };

  return (
    <>
      {/* Cinta navideña animada arriba del título: pista con items dinámicos y duplicados para movimiento sin huecos */}
      <div className="holiday-ribbon" aria-hidden="true">
        <div className="holiday-ribbon-track">
          {ribbonItems.map((item, i) => (
            <div key={`ribbon-${i}`} className="holiday-ribbon-item">
              <span className="ribbon-icon" aria-hidden>
                {/* SVG regalo */}
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path fill="#fff" d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7h16z"/>
                  <path fill="#2E8B57" d="M12 12V3l3 3h4v3H5V6h4l3-3v9z"/>
                  <path fill="#fff" d="M7 12h3v5H7zM14 12h3v5h-3z" opacity="0.9" />
                </svg>
              </span>
              <span className="ribbon-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

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

          {/* Botón verde navideño que baja a la sección de recomendaciones */}
          <Button
            onClick={goToReco}
            className="mt-3 px-4 py-2 rounded-pill christmas-btn"
            style={christmasButtonStyle}
          >
            Recomendaciones Navideñas
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

      {/* RECOMENDATIONS SECTION - NAVIDEÑAS */}
      <section ref={recoRef} className="reco-section container mt-5" aria-label="Recomendaciones del mes navideño">
        <div className="reco-header d-flex align-items-center justify-content-between mb-3">
          <h3 className="mb-0 brand">Recomendaciones del mes navideño</h3>
          <div className="reco-subtext text-muted">Selección especial para estas fiestas</div>
        </div>

        <div className="reco-carousel card p-3">
          {recoProducts.length === 0 ? (
            <div className="p-4 text-center text-muted">No hay recomendaciones disponibles aún.</div>
          ) : (
            <div className="d-flex align-items-center">
              <button className="carousel-control prev" onClick={prevReco} aria-label="Anterior">‹</button>

              <div className="carousel-frame flex-fill text-center">
                {/* Imagen principal */}
                <img
                  src={recoProducts[recoIndex].imagenUrl}
                  alt={recoProducts[recoIndex].nombre}
                  className={`carousel-image ${recoAnimating ? 'reco-animate' : ''}`}
                />

                <div className="mt-2">
                  <strong>{recoProducts[recoIndex].nombre}</strong>
                  <div className="text-muted">{recoProducts[recoIndex].descripcion}</div>
                </div>
              </div>

              <button className="carousel-control next" onClick={nextReco} aria-label="Siguiente">›</button>
            </div>
          )}

          {/* indicadores */}
          {recoProducts.length > 1 && (
            <div className="d-flex justify-content-center gap-2 mt-3">
              {recoProducts.map((_, i) => (
                <button key={i} className={`reco-dot ${i === recoIndex ? 'active' : ''}`} onClick={() => setRecoIndex(i)} aria-label={`Ir a ${i+1}`} />
              ))}
            </div>
          )}
        </div>
      </section>

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
