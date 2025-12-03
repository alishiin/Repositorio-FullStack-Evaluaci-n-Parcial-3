// @ts-nocheck
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSession } from "../hooks/useSession";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../utils/constants";

function Carrito() {
  const [cart, setCart] = useState([]);
  const { isLogged, user } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleBuy = async () => {
    if (!isLogged) {
      alert("Debes iniciar sesión para comprar");
      navigate(ROUTE_PATHS.SIGN_IN);
      return;
    }

    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }


    const items = cart.map(p =>
      JSON.stringify({
        id: p.id,
        nombre: p.nombre,
        precio: p.precio,
        quantity: 1,
      })
    );

    const order = {
      user: user?.email || "desconocido",
      total: cart.reduce((acc, p) => acc + Number(p.precio), 0),
      items: items,
    };

    try {
      const res = await fetch("https://api-productos-pasteleria.onrender.com/api/ordenes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error creando orden:", res.status, text);
        alert("Error al procesar la compra: " + text);
        return;
      }

      const data = await res.json();
      console.log("Orden creada:", data);
      alert("Compra realizada con éxito");

      localStorage.removeItem("cart");
      setCart([]);

    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al procesar la compra");
    }
  };

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  if (cart.length === 0)
    return <h3 className="text-center mt-5">Tu carrito está vacío</h3>;

  const total = cart.reduce((acc, product) => acc + Number(product.precio), 0);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Carrito de Compras</h2>
      <Row>
        {cart.map((product, index) => (
          <Col key={index} xs={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.imagenUrl} />
              <Card.Body>
                <Card.Title>{product.nombre}</Card.Title>
                <Card.Text>${product.precio}</Card.Text>
                <Button
                  variant="danger"
                  className="me-2"
                  onClick={() => handleRemove(index)}
                >
                  Quitar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <h4>Total: ${total}</h4>
        <Button variant="success" onClick={handleBuy}>
          Comprar
        </Button>
      </div>
    </Container>
  );
}

export default Carrito;
