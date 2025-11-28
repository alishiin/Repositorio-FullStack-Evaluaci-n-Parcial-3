import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoadingButton from "../components/LoadingButton";

describe("LoadingButton - Validación de estados", () => {
  it("el botón debe iniciar habilitado", () => {
    render(<LoadingButton buttonText="Comprar" onClickPromise={() => {}} />);
    const btn = screen.getByRole("button", { name: "Comprar" });
    expect(btn).not.toBeDisabled();
  });

  it("el botón debe deshabilitarse solo durante la carga", async () => {
    const mock = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(
      <LoadingButton
        buttonText="Pagar"
        buttonLoadingText="Procesando..."
        onClickPromise={mock}
      />
    );

    const btn = screen.getByRole("button", { name: "Pagar" });

    fireEvent.click(btn);
    expect(btn).toBeDisabled();

    await waitFor(() => expect(btn).not.toBeDisabled());
  });
});
