import { act, within } from "@testing-library/react";
import { createRoot } from "react-dom/client";

vi.mock("react-dom/client", async (importOriginal) => {
  const client = await importOriginal<typeof import("react-dom/client")>();
  return { ...client, createRoot: vi.fn(client.createRoot) };
});

test("mounts the portfolio in the page root", async () => {
  const container = document.createElement("div");
  container.id = "root";
  document.body.appendChild(container);

  try {
    await act(async () => {
      await import("../src/main");
    });

    const portfolio = within(container);
    expect(
      portfolio.getByRole("heading", { level: 1, name: "Angel Wiebe" }),
    ).toBeInTheDocument();
    expect(portfolio.getByRole("banner")).toBeInTheDocument();
    expect(portfolio.getByRole("main")).toBeInTheDocument();
  } finally {
    const result = vi.mocked(createRoot).mock.results[0];
    if (result?.type === "return") {
      act(() => result.value.unmount());
    }
    container.remove();
  }
});
