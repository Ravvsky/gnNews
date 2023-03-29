import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Footer from "./Footer";
import { Selector, useSelector } from "react-redux";

jest.mock("react-redux");
jest.mock("next-i18next");
jest.mock("next-i18next", () => ({
  appWithTranslation: jest.fn((Footer) => Footer),
}));

const tMock = jest.fn((key) => {
  switch (key) {
    case "currentTime":
      return "Current Time";
    case "articlesOnHomePage":
      return "Number of articles on home page:";
    default:
      return key;
  }
});
jest.mock("next-i18next", () => ({
  useTranslation: () => ({ t: tMock }),
}));
describe("Footer", () => {
  const useSelectorMock = useSelector as unknown as jest.MockedFunction<
    Selector<{ visibleArticles: number }, number>
  >;

  beforeEach(() => {
    useSelectorMock.mockReturnValue(10);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render currenttime and number of articles on homepage in english", () => {
    const { getByText } = render(<Footer />);
    const currentTime = new Date().toLocaleTimeString("pl-pl", {
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(getByText(`Current Time ${currentTime}`)).toBeInTheDocument();
    expect(
      getByText(`Number of articles on home page: 10`)
    ).toBeInTheDocument();
  });
  it("should render currenttime and number of articles on homepage in polish", () => {
    tMock.mockImplementation((key) => {
      switch (key) {
        case "currentTime":
          return "Aktualny czas";
        case "articlesOnHomePage":
          return "Liczba artykułów na stronie głównej:";
        default:
          return key;
      }
    });
    const { getByText } = render(<Footer />);
    const currentTime = new Date().toLocaleTimeString("pl-pl", {
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(getByText(`Aktualny czas ${currentTime}`)).toBeInTheDocument();
    expect(
      getByText(`Liczba artykułów na stronie głównej: 10`)
    ).toBeInTheDocument();
  });
});
