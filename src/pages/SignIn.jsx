import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import LoadingButton from "../components/LoadingButton";
import { signIn as apiSignIn } from "../services/auth";
import { useSession } from "../hooks/useSession";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../utils/constants";
import Register from "./Register";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const { isLogged, signIn } = useSession();

  useEffect(() => {
    if (isLogged) navigate(ROUTE_PATHS.HOME);
  }, [isLogged, navigate]);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Por favor ingresa tu correo y contraseña");
      return;
    }

    setError("");
    return apiSignIn(email, password)
      .then((user) => signIn(user))
      .catch((err) => setError(err.message));
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          {showRegister ? (
            <>
              <Register onSuccess={() => setShowRegister(false)} />
              <div className="text-center mt-3">
                <Button variant="link" onClick={() => setShowRegister(false)}>
                  ¿Ya tienes cuenta? Inicia sesión
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-center mb-4">Iniciar sesión</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    style={{ height: "45px", fontSize: "16px" }}
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    style={{ height: "45px", fontSize: "16px" }}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <LoadingButton
                  onClickPromise={handleSubmit}
                  buttonText="Iniciar sesión"
                  buttonLoadingText="Iniciando sesión..."
                  className="w-100"
                />
              </Form>

              <div className="text-center mt-3">
                <Button variant="link" onClick={() => setShowRegister(true)}>
                  ¿No tienes cuenta? Regístrate
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
