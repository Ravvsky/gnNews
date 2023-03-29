import { render, screen, fireEvent } from "@testing-library/react";
import Article, { ArticleProps } from "../Article/Article";
import "@testing-library/jest-dom";

jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));
describe("Article component", () => {
  const setup = () => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");

    document.body.appendChild(modalRoot);
  };
  beforeEach(() => {
    setup();
  });
  const articleProps = {
    variant: "card",
    imageUrl: "https://example.com/image.jpg",
    title: "Example article",
    description: "This is an example article",
    content: "This is the content of the example article",
    sourceName: "Example source",
    sourceUrl: "https://example.com",
    publishedAt: "2022-03-29T18:00:00.000Z",
  } as ArticleProps;
  it("renders article title", () => {
    render(<Article {...articleProps} />);
    const articleTitle = screen.getByText(articleProps.title);
    expect(articleTitle).toBeInTheDocument();
  });

  it("renders article description", () => {
    render(<Article {...articleProps} />);
    const articleDescription = screen.getByText(articleProps.description);
    expect(articleDescription).toBeInTheDocument();
  });

  it("renders article source name and URL", () => {
    render(<Article {...articleProps} />);
    const articleSource = screen.getByText(articleProps.sourceName);
    const articleSourceLink = screen.getByRole("link", {
      name: articleProps.sourceName,
    });
    expect(articleSource).toBeInTheDocument();
    expect(articleSourceLink).toHaveAttribute("href", "https://example.com");
  });

  it("renders article published date", () => {
    render(<Article {...articleProps} />);
    const articleDate = screen.getByText("2022-03-29");
    expect(articleDate).toBeInTheDocument();
  });

  it("renders article modal on click", () => {
    render(<Article {...articleProps} />);
    const articleCard = screen.getByTestId("article-card");
    fireEvent.click(articleCard);
    const articleModal = screen.getByTestId("article-modal");
    expect(articleModal).toBeInTheDocument();
  });
});
