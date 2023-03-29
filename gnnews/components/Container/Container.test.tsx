import { render } from "@testing-library/react";
import Container from "./Container";
import "@testing-library/jest-dom";

describe("Container component", () => {
  it("should render the component with children", () => {
    const children = <div>Child element</div>;
    const { getByTestId, getByText } = render(
      <Container>{children}</Container>
    );
    const container = getByTestId("container");
    const childElement = getByText("Child element");

    expect(container).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
  });

  it("should render the component with className", () => {
    const { getByTestId } = render(
      <Container className="custom-class">Container content</Container>
    );
    const container = getByTestId("container");

    expect(container).toHaveClass("custom-class");
  });
});
