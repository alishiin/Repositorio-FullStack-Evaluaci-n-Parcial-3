import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProductCard from "../components/ProductCard";
import { formatPrice } from "../utils/formatters";

describe("ProductCard - Contenido adicional", () => {
  const product = {
    name: "Brownie",
    price: 4.25,
    description: "Brownie húmedo de chocolate",
    image: "/images/brownie.jpg",
  };

  it("muestra el nombre y el precio en etiquetas HTML correctas", () => {
    render(<ProductCard {...product} />);
    const name = screen.getByText(product.name);
    const price = screen.getByText(formatPrice(product.price));

    expect(name.tagName).toBe("H3");        // EJEMPLO: si usas <h3>
    expect(price.tagName).toMatch(/p|span/i); // Acepta <p> o <span>
  });

  it("la descripción nunca debe estar vacía si viene definida", () => {
    render(<ProductCard {...product} />);
    const desc = screen.getByText(product.description);
    expect(desc.textContent.length).toBeGreaterThan(0);
  });
});
