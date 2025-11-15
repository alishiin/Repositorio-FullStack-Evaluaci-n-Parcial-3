import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoadingButton from "../components/LoadingButton";

describe("Componente LoadingButton", () => {
  it("debería mostrar el texto normal del botón cuando no está cargando", () => {
    render(<LoadingButton buttonText="Enviar" onClickPromise={() => {}} />);
    const boton = screen.getByRole("button", { name: "Enviar" });
    expect(boton).toBeInTheDocument();
    expect(boton).not.toBeDisabled();
  });

  it("mostrar texto de carga y deshabilitar el botón mientras onClickPromise se ejecuta", async () => {
    const promiseMock = vi.fn(() => new Promise((resolve) => setTimeout(resolve, 100)));
    render(
      <LoadingButton
        buttonText="Enviar"
        buttonLoadingText="Procesando..."
        onClickPromise={promiseMock}
      />
    );

    const boton = screen.getByRole("button", { name: "Enviar" });

    fireEvent.click(boton);

    expect(boton).toHaveTextContent("Procesando...");
    expect(boton).toBeDisabled();

    await waitFor(() => expect(boton).toHaveTextContent("Enviar"));
    expect(boton).not.toBeDisabled();
  });
});
