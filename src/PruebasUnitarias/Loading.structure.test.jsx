import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "../components/Loading";

describe("Loading Component - Estructura interna", () => {
  it("renderiza un contenedor con role='status'", () => {
    render(<Loading />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("el contenedor debe tener al menos 1 hijo (animación)", () => {
    render(<Loading />);
    const spinner = screen.getByRole("status");
    expect(spinner.childElementCount).toBeGreaterThan(0);
  });
});
