import { render, screen } from "@testing-library/react";
import { Register } from "./Register";
import { MemoryRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

const { REACT_APP_API_ENDPOINT } = process.env;

const server = setupServer(
  rest.get(`${REACT_APP_API_ENDPOINT}/auth/data`, (res, ctx) => {
    return res(
      ctx.json({
        result: {
          continente: ["America", "Europa", "Otro"],
          region: ["Otro", "Latam", "Brasil", "America del Norte"],
          Rol: ["Team Member", "Team Leader"],
        },
      })
    );
  })
);

beforeAll(() => server.listen());

it("fetch options", async () => {
  render(<Register />, { wrapper: MemoryRouter });

  expect(
    screen.getByRole("option", { name: "Elige una opcion" })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole("option", { name: "Europa" })
  ).toBeInTheDocument();
});
