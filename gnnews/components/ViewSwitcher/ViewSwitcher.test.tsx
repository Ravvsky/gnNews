import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Selector, useSelector, useDispatch } from "react-redux";
import ViewSwitcher from "./ViewSwitcher";
import { setView } from "@/store/reducers";
import "@testing-library/jest-dom";

jest.mock("react-redux");

describe("ViewSwitcher", () => {
  const dispatch = jest.fn();

  const useSelectorMock = useSelector as unknown as jest.MockedFunction<
    Selector<{ view: string }, string>
  >;
  const useDispatchMock = useDispatch as jest.MockedFunction<
    typeof useDispatch
  >;
  useDispatchMock.mockReturnValue(dispatch);
  beforeEach(() => {
    useSelectorMock.mockReturnValue("list");
    useDispatchMock.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the correct icon", () => {
    const { getByText } = render(<ViewSwitcher />);
    const icon = getByText("list");
    expect(icon).toBeInTheDocument();
  });

  it("should dispatch the setView action when clicked", () => {
    const { getByRole } = render(<ViewSwitcher />);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(dispatch).toHaveBeenCalledWith(setView());
  });
});
