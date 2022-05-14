import { render, screen } from "@testing-library/react";
import { Donate } from "./Donate";

describe("renderizado en Donate", () => {
  it("renderiza un h1", () => {
    render(<Donate />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Hola soy la pagina para donar",
      })
    ).toBeInTheDocument();
  });

  it("renderiza un a", () => {
    render(<Donate />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://mpago.la/2A4g4A4"
    );
  });

  it("renderiza un a con target blank", () => {
    render(<Donate />);

    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
});
