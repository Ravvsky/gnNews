import { render } from "@testing-library/react";
import Country from "./Country";
import "@testing-library/jest-dom";

describe("Country component", () => {
  it("renders Country component without errors", () => {
    render(<Country name="France" flag="🇫🇷" countryCode="FR" />);
  });

  it("displays correct country name and flag", () => {
    const { getByText } = render(
      <Country name="France" flag="🇫🇷" countryCode="FR" />
    );
    expect(getByText("France")).toBeInTheDocument();
    expect(getByText("🇫🇷")).toBeInTheDocument();
  });

  test("has correct link URL", () => {
    const { getByRole } = render(
      <Country name="France" flag="🇫🇷" countryCode="FR" />
    );
    const link = getByRole("link");
    expect(link).toHaveAttribute("href", "/country/fr");
  });
});
