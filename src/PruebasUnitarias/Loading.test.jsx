import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "../components/Loading";

describe("Loading Component", () => {
  it("renders spinner with status role", () => {
    render(<Loading />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });
});
