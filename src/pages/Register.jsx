import { useState } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import LoadingButton from "../components/LoadingButton";
import { register } from "../services/auth";

function Register({ onSuccess }) {
  const [email, setEmail] = useState(""); // 👈 cambio aquí
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = () => {
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");
    register(email, password)
      .then(() => {
        setSuccess("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
        if (onSuccess) onSuccess();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <h2 className="text-center mb-4">Crear cuenta</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label> {/* 👈 cambio aquí */}
              <Form.Control
                type="email"
                style={{ height: "45px", fontSize: "16px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                style={{ height: "45px", fontSize: "16px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Elige una contraseña"
              />
            </Form.Group>

            <LoadingButton
              onClickPromise={handleRegister}
              buttonText="Crear cuenta"
              buttonLoadingText="Registrando..."
              className="w-100"
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
