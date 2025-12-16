import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";

function Profile() {
  const { isLogged, userSession } = useSession();
  const navigate = useNavigate();
  const [showDenied, setShowDenied] = useState(false);

  useEffect(() => {
    if (!isLogged) navigate("/signin");
  }, [isLogged, navigate]);

  if (!isLogged || !userSession) return null; // evitar render si no está listo

  // Si es admin, impedir acceso: mostrar pequeño toast y redirigir al home
  if (userSession?.isAdmin || userSession?.role === "admin") {
    // mostrar notificación breve
    if (!showDenied) {
      setShowDenied(true);
      setTimeout(() => {
        setShowDenied(false);
        navigate("/");
      }, 1400);
    }
    return (
      <div>
        {showDenied && (
          <div className="admin-denied-toast animate-fade-up" role="status" aria-live="polite">
            Acceso denegado para admin
          </div>
        )}
      </div>
    );
  }

  return (
    <Container className="profile-page">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="profile-card animate-fade-up">
            <Card.Body>
              <div className="profile-header d-flex align-items-center gap-3 mb-4">
                <div className="profile-avatar" aria-hidden>
                  {userSession.avatar ? (
                    <img src={userSession.avatar} alt={`${userSession.username} avatar`} />
                  ) : (
                    <div className="avatar-fallback">{userSession.username?.charAt(0)}</div>
                  )}
                </div>
                <div>
                  <h2 className="mb-1">{userSession.username}</h2>
                  <div className="text-muted">Miembro desde: {userSession.createdAt || "2025"}</div>
                </div>
              </div>

              <Row>
                <Col xs={12} className="mb-3">
                  <h5>Información personal</h5>
                  <div className="profile-field"><strong>Nombre:</strong> {userSession.name || "juanito"}</div>
                  <div className="profile-field"><strong>Correo:</strong> {userSession.email || "-"}</div>
                </Col>

                <Col xs={12} className="d-flex gap-2 justify-content-end">
                  <Button variant="outline-primary" onClick={() => navigate(-1)}>Volver</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
