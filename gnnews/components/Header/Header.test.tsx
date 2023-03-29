import { render, fireEvent, getByText } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { Selector, useSelector, useDispatch } from "react-redux";

jest.mock("react-redux");
jest.mock("../Button/Button", () => {
  return jest.fn((props) => {
    return (
      <button data-testid="button" type={props.type} onClick={props.onClick}>
        {props.children}
      </button>
    );
  });
});
describe("Header component", () => {
  const useSelectorMock = useSelector as unknown as jest.MockedFunction<
    Selector<{ view: string }, string>
  >;

  beforeEach(() => {
    useSelectorMock.mockReturnValue("list");
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the logo and switches", () => {
    const { getByTestId } = render(<Header />);
    const logo = getByTestId("logo");
    const viewSwitcher = getByTestId("view-switcher");
    const languageSwitcher = getByTestId("language-switcher");

    expect(logo).toBeInTheDocument();
    expect(logo.getAttribute("href")).toBe("/");
    expect(viewSwitcher).toBeInTheDocument();
    expect(languageSwitcher).toBeInTheDocument();
  });

  it("calls clickHandler function when Pop up button is clicked", () => {
    const clickHandler = jest.fn();
    const { getByText } = render(<Header onClick={clickHandler} />);
    const popupButton = getByText("Pop up");

    fireEvent.click(popupButton);
    expect(popupButton).toBeInTheDocument();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
