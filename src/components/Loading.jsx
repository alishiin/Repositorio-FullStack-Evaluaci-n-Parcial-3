import { Spinner } from "react-bootstrap";

function Loading({ small = false }) {
  if (small) {
    return (
      <div className="d-flex gap-2">
        <div style={{ width: 80, height: 80 }} className="skeleton rounded" />
        <div style={{ flex: 1 }}>
          <div
            className="skeleton rounded mb-2"
            style={{ height: 18, width: "60%" }}
          />
          <div className="skeleton rounded" style={{ height: 12, width: "80%" }} />
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </div>
  );
}

export default Loading;