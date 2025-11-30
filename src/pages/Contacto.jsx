import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useSession } from "../hooks/useSession";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../utils/constants";

function Contacto() {
  const { isLogged } = useSession();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogged) {
      alert("Debes iniciar sesión para enviar un mensaje");
      navigate(ROUTE_PATHS.SIGN_IN);
      return;
    }

    if (!name || !email || !subject || !message) {
      setError("Todos los campos son obligatorios.");
      setSuccess("");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          email: email,
          asunto: subject,
          mensaje: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      setSuccess("¡Gracias por contactarnos! Te responderemos pronto.");
      setError("");

      // Reset campos
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

    } catch (err) {
      setError("No pudimos enviar tu mensaje. Intenta más tarde.");
      console.error(err);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center text-pink-600 mb-4">Contáctanos</h2>
          <p className="text-center text-muted mb-4">
            ¿Tienes dudas, pedidos especiales o sugerencias? Escribe aquí y te
            responderemos lo antes posible.
          </p>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ height: "45px", fontSize: "16px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ height: "45px", fontSize: "16px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Asunto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Asunto del mensaje"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{ height: "45px", fontSize: "16px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Escribe tu mensaje aquí..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ fontSize: "16px" }}
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 rounded-pill"
              style={{
                backgroundColor: "#ec4899",
                border: "none",
                color: "white",
              }}
            >
              Enviar mensaje
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;
