import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoadingButton from "../components/LoadingButton";

describe("LoadingButton - Comportamiento extendido", () => {
  it("restaura correctamente el foco después de terminar la carga", async () => {
    const mock = vi.fn(
      () => new Promise(resolve => setTimeout(resolve, 120))
    );

    render(
      <LoadingButton
        buttonText="Guardar"
        buttonLoadingText="Guardando..."
        onClickPromise={mock}
      />
    );

    const btn = screen.getByRole("button", { name: "Guardar" });
    btn.focus();
    expect(btn).toHaveFocus();

    fireEvent.click(btn);

    await waitFor(() => {
      expect(btn).toHaveTextContent("Guardar");
      expect(btn).toHaveFocus();
    });
  });

  it("agrega y remueve la clase 'loading' dinámicamente", async () => {
    const mock = vi.fn(() => new Promise(resolve => setTimeout(resolve, 90)));

    render(
      <LoadingButton
        buttonText="Enviar"
        buttonLoadingText="Procesando..."
        onClickPromise={mock}
      />
    );

    const btn = screen.getByRole("button", { name: "Enviar" });

    fireEvent.click(btn);
    expect(btn).toHaveClass("loading");

    await waitFor(() => expect(btn).not.toHaveClass("loading"));
  });
});
