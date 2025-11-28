import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProductCard from "../components/ProductCard";

describe("ProductCard - Manejo de error en la imagen", () => {
  const product = {
    name: "Torta de Manjar",
    price: 14.5,
    description: "Bizcocho suave con manjar casero",
    image: "/images/no-existe.jpg", // imagen que fallará
  };

  it("reemplaza la imagen por defecto si la imagen original falla al cargar", () => {
    render(<ProductCard {...product} />);

    const img = screen.getByRole("img");

    // Simular error al cargar la imagen
    fireEvent.error(img);

    expect(img).toHaveAttribute("src", "/images/default-product.jpg");
  });
});
