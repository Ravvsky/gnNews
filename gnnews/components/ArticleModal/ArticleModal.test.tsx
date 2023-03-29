import React from "react";
import { render, screen } from "@testing-library/react";
import ArticleModal from "./ArticleModal";
import "@testing-library/jest-dom";

jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

describe("ArticleModal", () => {
  const setup = () => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");

    document.body.appendChild(modalRoot);
  };
  beforeEach(() => {
    setup();
  });
  const props = {
    title: "Test title",
    author: "Authro",
    imageUrl: "https://example.com/image.jpg",
    description: "Test description",
    content: "Test content",
    sourceUrl: "https://example.com",
    sourceName: "Example",
    onClose: jest.fn(),
  };

  it("renders the title and description", () => {
    render(<ArticleModal {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  it("renders the image if provided", () => {
    render(<ArticleModal {...props} />);
    const image = screen.getByAltText("Article image");
    expect(image).toBeInTheDocument();
  });

  it("renders the content and source link", () => {
    render(<ArticleModal {...props} />);
    expect(screen.getByText(props.content)).toBeInTheDocument();
    const link = screen.getByText(props.sourceName);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", props.sourceUrl);
  });
});
