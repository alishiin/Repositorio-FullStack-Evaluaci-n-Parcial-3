import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { ROUTE_PATHS } from "../utils/constants";

function Checkout() {
  const navigate = useNavigate();
  const { isLogged, userSession } = useSession();
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("transferencia");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDenied, setShowDenied] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const total = useMemo(() => cart.reduce((acc, p) => acc + Number(p.precio), 0), [cart]);

  useEffect(() => {
    if (!isLogged) {
      navigate(ROUTE_PATHS.SIGN_IN);
    }
  }, [isLogged, navigate]);

  const handleConfirmPurchase = async () => {
    // Bloquear para admin
    const isAdmin = userSession?.isAdmin || userSession?.role === 'admin';
    if (isAdmin) {
      setShowDenied(true);
      setTimeout(() => setShowDenied(false), 1800);
      return;
    }
    setError("");
    if (cart.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    setLoading(true);

    const items = cart.map(p => ({ id: p.id, nombre: p.nombre, precio: p.precio, quantity: 1 }));

    const order = {
      username: userSession?.email || "desconocido",
      total,
      items,
      paymentMethod
    };

    try {
      const res = await fetch("https://api-productos-pasteleria.onrender.com/api/ordenes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });

      if (!res.ok) {
        const text = await res.text();
        setError("Error al procesar la compra: " + text);
        setLoading(false);
        return;
      }

      const orderResponse = await res.json();
      // Limpiar carrito y navegar a página de éxito con la orden en el state
      localStorage.removeItem("cart");
      setCart([]);
      navigate(ROUTE_PATHS.ORDER_SUCCESS, { state: { order: orderResponse } });

    } catch (err) {
      console.error(err);
      setError("Error al procesar la compra");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) return <h3 className="text-center mt-5">Tu carrito está vacío</h3>;

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Resumen de compra</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              {cart.map((p, idx) => (
                <div key={idx} className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center gap-3">
                    <img src={p.imagenUrl} alt={p.nombre} width={72} style={{objectFit:'cover'}} />
                    <div>
                      <div style={{fontWeight:700}}>{p.nombre}</div>
                      <div className="text-muted">${p.precio}</div>
                    </div>
                  </div>
                  <div style={{fontWeight:700}}>${p.precio}</div>
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Datos de pago</h5>

              <Form>
                <Form.Group>
                  <div className="mb-2" style={{fontWeight:600}}>Método de pago</div>
                  <div>
                    <Form.Check inline label="Transferencia bancaria" name="payment" type="radio" id="pm-transfer" checked={paymentMethod==="transferencia"} onChange={() => setPaymentMethod('transferencia')} />
                    <Form.Check inline label="WebPay" name="payment" type="radio" id="pm-webpay" checked={paymentMethod==="webpay"} onChange={() => setPaymentMethod('webpay')} />
                  </div>
                </Form.Group>

                {paymentMethod === 'transferencia' && (
                  <div className="mt-3">
                    <div className="mb-2">Realiza la transferencia a:</div>
                    <div className="p-3" style={{background:'#fff7f9', borderRadius:8}}>
                      <div><strong>Banco:</strong> Banco Fantasía</div>
                      <div><strong>Cuenta:</strong> 123456789</div>
                      <div><strong>Rut:</strong> 12.345.678-9</div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'webpay' && (
                  <div className="mt-3">
                    <div className="mb-2">Al seleccionar WebPay serás redirigido al checkout seguro (simulado).</div>
                  </div>
                )}

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
                  <Button variant="primary" onClick={handleConfirmPurchase} disabled={loading}>{loading ? 'Procesando...' : 'Confirmar compra'}</Button>
                </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="p-3">
            <div style={{fontWeight:700}}>Total</div>
            <div style={{fontSize:22, fontWeight:800}}>${total}</div>
            <div className="text-muted mt-2">Cliente: {userSession?.email || 'Invitado'}</div>
          </Card>
          {showDenied && (
            <div className="admin-denied-toast animate-fade-up" role="status" aria-live="polite">
              Acción denegada para admin
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
