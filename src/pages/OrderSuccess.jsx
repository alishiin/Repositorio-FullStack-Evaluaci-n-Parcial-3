import { useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../utils/constants";

function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order || null;

  useEffect(() => {
    // Si no hay order en el state, podríamos redirigir al home
    // pero por ahora mostramos un mensaje genérico
  }, [order]);

  return (
    <Container className="my-5">
      <Card className="p-4 text-center animate-fade-up">
        <h2>Gracias por tu compra</h2>
        {order ? (
          <div className="mt-3">
            <div><strong>Orden ID:</strong> {order.id}</div>
            <div><strong>Total:</strong> ${order.total}</div>
            <div className="mt-2 text-muted">Te enviaremos información al correo {order.user || ''}</div>
          </div>
        ) : (
          <div className="mt-3">Hemos recibido tu compra correctamente.</div>
        )}

        <div className="mt-4">
          <Button variant="primary" onClick={() => navigate(ROUTE_PATHS.HOME)}>Volver al catálogo</Button>
        </div>
      </Card>
    </Container>
  );
}

export default OrderSuccess;

