import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "../components/Loading";

describe("Loading Component - Accesibilidad", () => {
  it("tiene aria-busy en true", () => {
    render(<Loading />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveAttribute("aria-busy", "true");
  });

  it("incluye texto alternativo oculto para lectores de pantalla", () => {
    render(<Loading />);
    const label = screen.getByText(/cargando/i);
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("sr-only");
  });
});
