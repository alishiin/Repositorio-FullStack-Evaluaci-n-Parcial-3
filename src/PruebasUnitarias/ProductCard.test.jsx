import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductCard from "../components/ProductCard";
import { formatPrice } from "../utils/formatters";

describe("Componente ProductCard", () => {
  const product = {
    name: "Pastel de Chocolate",
    price: 15.99,
    description: "Delicioso pastel de chocolate con cobertura de ganache",
    image: "/images/pastel-chocolate.jpg",
  };

  it("debería mostrar la imagen del producto con alt correcto", () => {
    render(<ProductCard {...product} />);
    const imagen = screen.getByAltText(`Imagen producto ${product.name}`);
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute("src", product.image);
  });

  it("debería mostrar el nombre, precio y descripción del producto", () => {
    render(<ProductCard {...product} />);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(formatPrice(product.price))).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
  });

  it("debería mostrar un botón con actionName y ejecutar action al hacer click", () => {
    const actionMock = vi.fn();
    render(<ProductCard {...product} action={actionMock} actionName="Agregar" />);
    
    const boton = screen.getByRole("button", { name: "Agregar" });
    expect(boton).toBeInTheDocument();
    
    fireEvent.click(boton);
    expect(actionMock).toHaveBeenCalledTimes(1);
  });

  it("no debería mostrar el botón si no se pasa 'action'", () => {
    render(<ProductCard {...product} />);
    const boton = screen.queryByRole("button");
    expect(boton).not.toBeInTheDocument();
  });
});
