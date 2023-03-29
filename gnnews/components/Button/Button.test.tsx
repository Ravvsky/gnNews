import { fireEvent, render } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";

describe("Button component", () => {
  it("should render the component with children", () => {
    const { getByTestId } = render(
      <Button type={"button"}>button text</Button>
    );
    const container = getByTestId("button");

    expect(container).toBeInTheDocument();
  });

  it("should render the component with className", () => {
    const { getByTestId } = render(
      <Button type={"button"} className="custom-class">
        button text
      </Button>
    );
    const container = getByTestId("button");

    expect(container).toHaveClass("custom-class");
  });

  it("should call the onClick function when clicked", () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Button type={"button"} onClick={handleClick}>
        button text
      </Button>
    );
    const container = getByTestId("button");
    fireEvent.click(container);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render a button with type 'submit'", () => {
    const { getByTestId } = render(
      <Button type={"submit"}>button text</Button>
    );
    const container = getByTestId("button");
    expect(container).toHaveAttribute("type", "submit");
  });
});
