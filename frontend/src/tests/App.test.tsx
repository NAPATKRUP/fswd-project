import { render, screen } from "@testing-library/react";
import App from "../App.tsx";

test("renders app should have title", () => {
  render(<App />);
  const titleElement = screen.getByTestId("app-header-title");
  expect(titleElement).toBeInTheDocument();
});
