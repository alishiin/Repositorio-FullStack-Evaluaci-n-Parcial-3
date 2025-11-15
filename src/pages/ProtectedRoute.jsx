
import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (requireAdmin && !user.isAdmin) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>🚫 Acceso denegado</h2>
        <p>Solo el administrador puede acceder a esta sección.</p>
      </div>
    );
  }

  return children;
}