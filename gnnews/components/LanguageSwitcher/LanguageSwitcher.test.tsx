import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LanguageSwitcher from "./LanguageSwitcher";
import "@testing-library/jest-dom";
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      locale: "en",
      locales: ["en", "pl"],
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

beforeEach(async () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");
  useRouter.mockImplementation(() => ({
    route: "/",
    pathname: "",
    query: "",
    asPath: "",
    locale: "en",
    locales: ["en", "pl"],
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  }));
});
describe("LanguageSwitcher", () => {
  test("should render select element with options", () => {
    const { getByLabelText, getAllByRole } = render(<LanguageSwitcher />);
    const select = getByLabelText("language-select");
    const options = getAllByRole("option");

    expect(select).toBeInTheDocument();
    expect(options).toHaveLength(2);
  });

  test("should call onChange handler when language is changed", () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(<LanguageSwitcher onChange={onChange} />);
    const select = getByLabelText("language-select");

    fireEvent.change(select, { target: { value: "pl" } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("pl");
  });

  test("should select the correct language based on the router's locale value", () => {
    const { getByLabelText } = render(<LanguageSwitcher />);
    const select = getByLabelText("language-select") as HTMLSelectElement;
    expect(select.value).toBe("en");
  });
});
